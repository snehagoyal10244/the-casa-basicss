const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({ name: String, hex: String }, { _id: false });
const sizeSchema  = new mongoose.Schema(
  { name: String, capacity: String, price: Number, orig: Number, isDefault: Boolean, tag: String },
  { _id: false }
);
const featureSchema = new mongoose.Schema({ title: String, desc: String }, { _id: false });

const productSchema = new mongoose.Schema(
  {
    legacyId:    { type: Number, index: true },   // maps to frontend numeric id
    title:       { type: String, required: true, trim: true },
    subtitle:    { type: String },
    category:    { type: String, required: true },  // slug e.g. 'cookware'
    material:    { type: String },
    price:       { type: Number, required: true },
    origPrice:   { type: Number },
    discountTag: { type: String },
    badge:       { type: String },
    stock:       { type: String, default: 'In Stock' },
    stockQty:    { type: Number, default: 100 },
    rating:      { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    colors:      [colorSchema],
    sizes:       [sizeSchema],
    images:      [String],
    description: { type: String },
    features:    [featureSchema],
    specs:       { type: Map, of: String },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);

