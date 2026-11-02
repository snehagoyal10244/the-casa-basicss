const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema(
  {
    product:  { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    legacyId: { type: Number },
    title:    { type: String },
    image:    { type: String },
    price:    { type: Number },
    badge:    { type: String },
    tag:      { type: String },
  },
  { _id: true }
);

const wishlistSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [wishlistItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);

