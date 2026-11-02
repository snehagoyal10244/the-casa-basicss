// Stripe is initialised lazily so the server doesn't crash when no key is set.
// In sandbox/test mode only — never use live keys in development.
let stripe = null;

const getStripe = () => {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key.startsWith('sk_test_placeholder')) {
      console.warn('⚠️  Stripe: STRIPE_SECRET_KEY not configured. Payment routes will return mock responses.');
      return null;
    }
    stripe = require('stripe')(key);
  }
  return stripe;
};

module.exports = { getStripe };

