const { getStripe } = require('../config/stripe');
const Order = require('../models/Order');

// ── POST /api/payments/create-intent ─────────────────────
exports.createPaymentIntent = async (req, res, next) => {
  try {
    const stripe = getStripe();

    if (!stripe) {
      // Stripe not configured — return a sandbox mock so dev can still test checkout UI
      return res.json({
        success: true,
        mock: true,
        clientSecret: 'mock_client_secret_stripe_not_configured',
        message: 'Stripe not configured. This is a mock response for development.',
      });
    }

    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // stripe expects cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ success: true, clientSecret: paymentIntent.client_secret });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/payments/webhook ────────────────────────────
exports.webhook = async (req, res, next) => {
  const stripe = getStripe();
  if (!stripe) return res.json({ received: true });

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook signature verification failed: ${err.message}` });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object;
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: pi.id },
        { paymentStatus: 'paid', status: 'confirmed' }
      );
    } else if (event.type === 'payment_intent.payment_failed') {
      const pi = event.data.object;
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: pi.id },
        { paymentStatus: 'failed' }
      );
    }
    res.json({ received: true });
  } catch (err) {
    next(err);
  }
};

