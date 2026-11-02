const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    legacyId: { type: Number },           // kept for quick lookup during transition
    title:    { type: String },
    image:    { type: String },
    price:    { type: Number, required: true },
    qty:      { type: Number, default: 1, min: 1 },
    color:    { type: String, default: 'Standard' },
    size:     { type: String, default: 'Standard' },
  },
  { _id: true }
);

const cartSchema = new mongoose.Schema(
  {
    user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items:         [cartItemSchema],
    promoCode:     { type: String },
    promoDiscount: { type: Number, default: 0 },  // decimal fraction e.g. 0.10
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);

