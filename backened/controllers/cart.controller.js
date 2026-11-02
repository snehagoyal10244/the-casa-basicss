const Cart    = require('../models/Cart');
const Product = require('../models/Product');

const PROMO_CODES = {
  WELCOME10: 0.10,
  CASA15:    0.15,
};

// ── GET /api/cart ─────────────────────────────────────────
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'title images price stockQty');
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/cart ────────────────────────────────────────
exports.addItem = async (req, res, next) => {
  try {
    const { productId, qty = 1, color = 'Standard', size = 'Standard', price } = req.body;

    // Accept either ObjectId or legacy numeric id
    let product;
    if (String(productId).match(/^\d+$/)) {
      product = await Product.findOne({ legacyId: Number(productId) });
    } else {
      product = await Product.findById(productId);
    }
    if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existingIdx = cart.items.findIndex(
      (i) => String(i.product) === String(product._id) && i.color === color && i.size === size
    );

    if (existingIdx > -1) {
      cart.items[existingIdx].qty += qty;
    } else {
      cart.items.push({
        product:  product._id,
        legacyId: product.legacyId,
        title:    product.title,
        image:    product.images?.[0],
        price:    price || product.price,
        qty,
        color,
        size,
      });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

// ── PUT /api/cart/:itemId ─────────────────────────────────
exports.updateItem = async (req, res, next) => {
  try {
    const { qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found.' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found in cart.' });

    if (qty <= 0) {
      item.deleteOne();
    } else {
      item.qty = qty;
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/cart/:itemId ──────────────────────────────
exports.removeItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found.' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found.' });

    item.deleteOne();
    await cart.save();
    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/cart ──────────────────────────────────────
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      cart.promoCode = undefined;
      cart.promoDiscount = 0;
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared.' });
  } catch (err) {
    next(err);
  }
};

// ── POST /api/cart/promo ──────────────────────────────────
exports.applyPromo = async (req, res, next) => {
  try {
    const code = (req.body.code || '').trim().toUpperCase();
    const discount = PROMO_CODES[code];
    if (!discount) {
      return res.status(400).json({ success: false, message: `Invalid promo code. Try 'WELCOME10' or 'CASA15'.` });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found.' });

    cart.promoCode = code;
    cart.promoDiscount = discount;
    await cart.save();

    res.json({ success: true, message: `Promo ${code} applied — ${discount * 100}% off!`, cart });
  } catch (err) {
    next(err);
  }
};

// ── DELETE /api/cart/promo ────────────────────────────────
exports.removePromo = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.promoCode = undefined;
      cart.promoDiscount = 0;
      await cart.save();
    }
    res.json({ success: true, message: 'Promo code removed.', cart });
  } catch (err) {
    next(err);
  }
};

