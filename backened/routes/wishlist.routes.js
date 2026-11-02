const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/wishlist.controller');

router.use(protect);

router.get('/',                  ctrl.getWishlist);
router.post('/',                 ctrl.addItem);
router.post('/move-to-cart',     ctrl.moveAllToCart);
router.delete('/:productId',     ctrl.removeItem);

module.exports = router;

