const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true },
    slug:  { type: String, required: true, unique: true, lowercase: true },
    icon:  { type: String },        // Material Symbol icon name
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);

