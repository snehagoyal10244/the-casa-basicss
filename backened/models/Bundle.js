const mongoose = require('mongoose');

const bundleItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    legacyId: { type: Number },
    title:    { type: String },
    image:    { type: String },
    price:    { type: Number },
  },
  { _id: false }
);

const bundleSchema = new mongoose.Schema(
  {
    slug:        { type: String, unique: true },
    title:       { type: String, required: true },
    subtitle:    { type: String },
    description: { type: String },
    price:       { type: Number, required: true },
    origPrice:   { type: Number },
    savings:     { type: Number },
    image:       { type: String },
    items:       [bundleItemSchema],
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bundle', bundleSchema);

