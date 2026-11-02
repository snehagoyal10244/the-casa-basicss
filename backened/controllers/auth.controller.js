const User = require('../models/User');
const { signToken } = require('../middleware/auth');

// ── Helper ────────────────────────────────────────────────
const userResponse = (user, token) => ({
  token,
  user: {
    id:        user._id,
    name:      user.name,
    email:     user.email,
    avatar:    user.avatar,
    role:      user.role,
    tier:      user.tier,
    points:    user.points,
    isGuest:   user.isGuest,
    addresses: user.addresses,
  },
});

// ── POST /api/auth/register ───────────────────────────────
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with that email already exists.' });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user);

    res.status(201).json({ success: true, ...userResponse(user, token) });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/auth/login ──────────────────────────────────
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account suspended. Contact support.' });
    }

    const token = signToken(user);
    res.json({ success: true, ...userResponse(user, token) });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/auth/guest ──────────────────────────────────
exports.loginAsGuest = async (req, res, next) => {
  try {
    // Create a transient guest user (not persisted — issue a short-lived token with a stub id)
    const payload = { id: 'guest-' + Date.now(), role: 'guest' };
    const token = require('jsonwebtoken').sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({
      success: true,
      token,
      user: {
        id:      payload.id,
        name:    'Guest Explorer',
        email:   'guest@thecasabasics.com',
        tier:    'Guest',
        points:  0,
        isGuest: true,
        role:    'guest',
      },
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/auth/me ──────────────────────────────────────
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/auth/me ──────────────────────────────────────
exports.updateMe = async (req, res, next) => {
  try {
    const { name, avatar, addresses } = req.body;
    const updates = {};
    if (name)      updates.name = name;
    if (avatar)    updates.avatar = avatar;
    if (addresses) updates.addresses = addresses;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

