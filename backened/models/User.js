const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  street:    { type: String, required: true },
  city:      { type: String, required: true },
  state:     { type: String },
  zip:       { type: String },
  country:   { type: String, default: 'US' },
  phone:     { type: String },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:  { type: String, required: true, minlength: 6, select: false },
    avatar:    { type: String },
    role:      { type: String, enum: ['customer', 'admin'], default: 'customer' },
    tier:      { type: String, default: 'Casa Club Member' },
    points:    { type: Number, default: 100 },
    isGuest:   { type: Boolean, default: false },
    isActive:  { type: Boolean, default: true },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

