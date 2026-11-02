const Review  = require('../models/Review');
const Product = require('../models/Product');
const Order   = require('../models/Order');

// ── GET /api/reviews/product/:productId ───────────────────
exports.getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    // Support both ObjectId and legacy numeric id
    let productFilter = {};
    if (productId.match(/^\d+$/)) {
      const p = await Product.findOne({ legacyId: Number(productId) });
      if (!p) return res.status(404).json({ success: false, message: 'Product not found.' });
      productFilter.product = p._id;
    } else {
      productFilter.product = productId;
    }

    const [reviews, total] = await Promise.all([
      Review.find({ ...productFilter, isApproved: true })
        .populate('user', 'name avatar tier')
        .sort('-createdAt')
        .skip(skip)
        .limit(Number(limit)),
      Review.countDocuments({ ...productFilter, isApproved: true }),
    ]);

    res.json({ success: true, total, page: Number(page), reviews });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/reviews/product/:productId ──────────────────
exports.createReview = async (req, res, next) => {
  try {
    const { rating, title, body } = req.body;
    const { productId } = req.params;

    let product;
    if (productId.match(/^\d+$/)) {
      product = await Product.findOne({ legacyId: Number(productId) });
    } else {
      product = await Product.findById(productId);
    }
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    // Check if user has bought this product
    const hasBought = await Order.findOne({
      user: req.user._id,
      'items.product': product._id,
      paymentStatus: 'paid',
    });

    const review = await Review.create({
      product: product._id,
      user:    req.user._id,
      rating, title, body,
      isVerifiedBuyer: !!hasBought,
    });

    // Recalculate product rating average
    const allReviews = await Review.find({ product: product._id, isApproved: true });
    const avgRating  = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    await Product.findByIdAndUpdate(product._id, {
      rating:      Math.round(avgRating * 10) / 10,
      reviewCount: allReviews.length,
    });

    await review.populate('user', 'name avatar tier');
    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/reviews/:id ──────────────────────────────────
exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, user: req.user._id });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    const { rating, title, body } = req.body;
    if (rating) review.rating = rating;
    if (title)  review.title  = title;
    if (body)   review.body   = body;

    await review.save();
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/reviews/:id ───────────────────────────────
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.id });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });

    // Allow user to delete their own OR admin to delete any
    if (String(review.user) !== String(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorised.' });
    }

    await Review.deleteOne({ _id: review._id });
    res.json({ success: true, message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
};

