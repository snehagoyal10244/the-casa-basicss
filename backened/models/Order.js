const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    legacyId: { type: Number },
    title:    { type: String },
    image:    { type: String },
    price:    { type: Number },
    qty:      { type: Number },
    color:    { type: String },
    size:     { type: String },
  },
  { _id: false }
);

const trackingEventSchema = new mongoose.Schema(
  {
    status:    { type: String },
    message:   { type: String },
    timestamp: { type: Date, default: Date.now },
    location:  { type: String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber:    { type: String, unique: true },
    user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:          [orderItemSchema],

    // Financials
    subtotal:       { type: Number },
    discountAmount: { type: Number, default: 0 },
    shippingCost:   { type: Number, default: 0 },
    taxAmount:      { type: Number, default: 0 },
    totalAmount:    { type: Number, required: true },
    promoCode:      { type: String },

    // Delivery
    deliveryMethod: { type: String, enum: ['standard', 'express'], default: 'standard' },
    shippingAddress: {
      name:    String,
      street:  String,
      city:    String,
      state:   String,
      zip:     String,
      country: String,
      phone:   String,
    },

    // Payment
    paymentMethod:  { type: String, enum: ['wallet', 'card', 'cod'], default: 'card' },
    paymentStatus:  { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    stripePaymentIntentId: { type: String },

    // Status + Tracking
    status: {
      type: String,
      enum: ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'],
      default: 'placed',
    },
    trackingHistory: [trackingEventSchema],
    estimatedDelivery: { type: Date },

    // Courier (populated on ship)
    courier: {
      name:    String,
      rating:  Number,
      vehicle: String,
      eta:     String,
      avatar:  String,
    },
  },
  { timestamps: true }
);

// Auto-generate order number before save
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const rand = Math.floor(10000 + Math.random() * 90000);
    this.orderNumber = `CB-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

