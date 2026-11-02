const Product = require('../models/Product');
const Review  = require('../models/Review');

// ── GET /api/products ─────────────────────────────────────
exports.getProducts = async (req, res, next) => {
  try {
    const {
      search, category, minPrice, maxPrice,
      sort = '-createdAt', page = 1, limit = 20,
      material, inStock,
    } = req.query;

    const filter = { isActive: true };

    // Full-text search
    if (search) {
      filter.$text = { $search: search };
    }

    if (category && category !== 'all') filter.category = category;
    if (material) filter.material = { $regex: material, $options: 'i' };
    if (inStock === 'true') filter.stockQty = { $gt: 0 };

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      products,
    });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/products/:id ─────────────────────────────────
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Support both MongoDB ObjectId and legacy numeric id
    let product;
    if (id.match(/^\d+$/)) {
      product = await Product.findOne({ legacyId: Number(id), isActive: true });
    } else {
      product = await Product.findOne({ _id: id, isActive: true });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Fetch top reviews alongside
    const reviews = await Review.find({ product: product._id, isApproved: true })
      .populate('user', 'name avatar')
      .sort('-createdAt')
      .limit(10);

    res.json({ success: true, product, reviews });
  } catch (err) {
    next(err);
  }
};

// ── GET /api/products/category/:slug ─────────────────────
exports.getProductsByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { sort = '-createdAt', page = 1, limit = 20 } = req.query;
    const filter = { isActive: true };
    if (slug !== 'all') filter.category = slug;

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({ success: true, total, products });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/products  (admin) ───────────────────────────
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/products/:id  (admin) ────────────────────────
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/products/:id  (admin) ────────────────────
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
    res.json({ success: true, message: 'Product deactivated.' });
  } catch (err) {
    next(err);
  }
};

