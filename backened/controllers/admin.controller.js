const User         = require('../models/User');
const Product      = require('../models/Product');
const Order        = require('../models/Order');
const Review       = require('../models/Review');
const SupportTicket = require('../models/SupportTicket');

// ── GET /api/admin/dashboard ──────────────────────────────
exports.getDashboard = async (req, res, next) => {
  try {
    const [
      totalUsers, totalProducts, totalOrders, totalRevenue,
      recentOrders, openTickets,
    ] = await Promise.all([
      User.countDocuments({ role: 'customer', isActive: true }),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Order.find().sort('-createdAt').limit(5).populate('user', 'name email'),
      SupportTicket.countDocuments({ status: { $in: ['open', 'in_progress'] } }),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        openTickets,
      },
      recentOrders,
    });
  } catch (err) {
    next(err);
  }
};

// ── Users ─────────────────────────────────────────────────
exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const filter = {};
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
      User.countDocuments(filter),
    ]);
    res.json({ success: true, total, users });
  } catch (err) {
    next(err);
  }
};

exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// ── Orders ────────────────────────────────────────────────
exports.getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};
    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)).populate('user', 'name email'),
      Order.countDocuments(filter),
    ]);
    res.json({ success: true, total, orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    order.status = status;
    order.trackingHistory.push({ status, message: message || `Status updated to ${status}.`, timestamp: new Date() });
    await order.save();
    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

// ── Reviews ───────────────────────────────────────────────
exports.getAllReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, isApproved } = req.query;
    const filter = {};
    if (isApproved !== undefined) filter.isApproved = isApproved === 'true';
    const skip = (Number(page) - 1) * Number(limit);
    const [reviews, total] = await Promise.all([
      Review.find(filter).populate('user', 'name').populate('product', 'title').sort('-createdAt').skip(skip).limit(Number(limit)),
      Review.countDocuments(filter),
    ]);
    res.json({ success: true, total, reviews });
  } catch (err) {
    next(err);
  }
};

exports.moderateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { isApproved: req.body.isApproved }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// ── Support Tickets ───────────────────────────────────────
exports.getAllTickets = async (req, res, next) => {
  try {
    const tickets = await SupportTicket.find().sort('-createdAt').populate('user', 'name email').limit(50);
    res.json({ success: true, tickets });
  } catch (err) {
    next(err);
  }
};

exports.updateTicketStatus = async (req, res, next) => {
  try {
    const ticket = await SupportTicket.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found.' });
    res.json({ success: true, ticket });
  } catch (err) {
    next(err);
  }
};

