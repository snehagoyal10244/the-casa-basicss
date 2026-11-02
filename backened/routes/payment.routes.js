const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/payment.controller');

// Webhook must receive raw body — handled in server.js with express.raw()
router.post('/webhook', ctrl.webhook);

// Authenticated payment intent creation
router.post('/create-intent', protect, ctrl.createPaymentIntent);

module.exports = router;

