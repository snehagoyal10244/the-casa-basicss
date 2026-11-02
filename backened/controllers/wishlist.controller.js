const Wishlist = require('../models/Wishlist');
const Cart     = require('../models/Cart');
const Product  = require('../models/Product');

// ── GET /api/wishlist ─────────────────────────────────────
exports.getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    res.json({ success: true, wishlist });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/wishlist ────────────────────────────────────
exports.addItem = async (req, res, next) => {
  try {
    const { productId } = req.body;

    let product;
    if (String(productId).match(/^\d+$/)) {
      product = await Product.findOne({ legacyId: Number(productId) });
    } else {
      product = await Product.findById(productId);
    }
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = new Wishlist({ user: req.user._id, items: [] });

    const alreadyIn = wishlist.items.find((i) => String(i.product) === String(product._id));
    if (alreadyIn) {
      return res.status(409).json({ success: false, message: 'Already in wishlist.' });
    }

    wishlist.items.unshift({
      product:  product._id,
      legacyId: product.legacyId,
      title:    product.title,
      image:    product.images?.[0],
      price:    product.price,
      badge:    product.badge || 'In Stock',
      tag:      product.subtitle || 'Mindful Craft',
    });

    await wishlist.save();
    res.json({ success: true, wishlist });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/wishlist/:productId ──────────────────────
exports.removeItem = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) return res.status(404).json({ success: false, message: 'Wishlist not found.' });

    const id = req.params.productId;
    wishlist.items = wishlist.items.filter(
      (i) => String(i._id) !== id && String(i.product) !== id
    );
    await wishlist.save();
    res.json({ success: true, wishlist });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/wishlist/move-to-cart ──────────────────────
exports.moveAllToCart = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist || wishlist.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Wishlist is empty.' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    for (const item of wishlist.items) {
      const exists = cart.items.find((c) => String(c.product) === String(item.product));
      if (exists) {
        exists.qty += 1;
      } else {
        cart.items.push({
          product:  item.product,
          legacyId: item.legacyId,
          title:    item.title,
          image:    item.image,
          price:    item.price,
          qty:      1,
          color:    'Standard',
          size:     'Standard',
        });
      }
    }

    wishlist.items = [];
    await Promise.all([cart.save(), wishlist.save()]);

    res.json({ success: true, message: 'All wishlist items moved to cart.', cart, wishlist });
  } catch (err) {
    next(err);
  }
};

