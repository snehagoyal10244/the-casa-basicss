const Order = require('../models/Order');
const Cart  = require('../models/Cart');

const FREE_SHIPPING_THRESHOLD = 85;
const TAX_RATE = 0.08875;

function calcTotals(items, promoDiscount = 0, deliveryMethod = 'standard') {
  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const discountAmount = Math.round(subtotal * promoDiscount * 100) / 100;
  const afterDiscount = Math.max(0, subtotal - discountAmount);

  let shippingCost = 0;
  if (deliveryMethod === 'express') {
    shippingCost = 8.00;
  } else if (subtotal < FREE_SHIPPING_THRESHOLD) {
    shippingCost = 4.95;
  }

  const taxAmount = Math.round(afterDiscount * TAX_RATE * 100) / 100;
  const totalAmount = Math.round((afterDiscount + shippingCost + taxAmount) * 100) / 100;

  return { subtotal, discountAmount, shippingCost, taxAmount, totalAmount };
}

// ── POST /api/orders ──────────────────────────────────────
exports.placeOrder = async (req, res, next) => {
  try {
    const { shippingAddress, deliveryMethod = 'standard', paymentMethod = 'card', stripePaymentIntentId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your cart is empty.' });
    }

    const { subtotal, discountAmount, shippingCost, taxAmount, totalAmount } = calcTotals(
      cart.items, cart.promoDiscount, deliveryMethod
    );

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + (deliveryMethod === 'express' ? 2 : 5));

    const order = await Order.create({
      user:           req.user._id,
      items:          cart.items.map((i) => ({
        product:  i.product,
        legacyId: i.legacyId,
        title:    i.title,
        image:    i.image,
        price:    i.price,
        qty:      i.qty,
        color:    i.color,
        size:     i.size,
      })),
      subtotal, discountAmount, shippingCost, taxAmount, totalAmount,
      promoCode:    cart.promoCode,
      deliveryMethod,
      shippingAddress,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      stripePaymentIntentId,
      status:       'confirmed',
      estimatedDelivery,
      trackingHistory: [
        { status: 'placed',     message: 'Order placed successfully.',     timestamp: new Date() },
        { status: 'confirmed',  message: 'Order confirmed by warehouse.', timestamp: new Date() },
      ],
      courier: {
        name:    'Leo K.',
        rating:  4.9,
        vehicle: 'EcoExpress EV Cargo',
        eta:     estimatedDelivery.toDateString(),
        avatar:  'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2JwfTIKEsKl9LFefkkP6I0Fy1DCAfW5-b260Ua24nvKLkRIBD1X3cuPlDGPJXYzf7OvqKXcNN4iFAk5F46-3C04UZ0crxJUneqh85TLglqKZA1MbSFPd1jr7oLic7Ezaz1NfFbNBa6nomYHH03NNsTRyTp7pIBQHZSwWfV7qi-IkboR2bio99Jz3dO4QCioLkJh5Hdg6GiwwSzh2Y4hjMiLc0FCxMI78rNAorY4',
      },
    });

    // Clear cart after successful order
    cart.items = [];
    cart.promoCode = undefined;
    cart.promoDiscount = 0;
    await cart.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/orders ───────────────────────────────────────
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt').limit(20);
    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/orders/:id ───────────────────────────────────
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/orders/:id/cancel ────────────────────────────
exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    if (!['placed', 'confirmed'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled at this stage.' });
    }

    order.status = 'cancelled';
    order.trackingHistory.push({ status: 'cancelled', message: 'Cancelled by customer.', timestamp: new Date() });
    await order.save();

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

