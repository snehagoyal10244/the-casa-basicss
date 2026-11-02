const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/cart.controller');

router.use(protect);

router.get('/',             ctrl.getCart);
router.post('/',            ctrl.addItem);
router.put('/:itemId',      ctrl.updateItem);
router.delete('/promo',     ctrl.removePromo);   // must come before /:itemId
router.delete('/:itemId',   ctrl.removeItem);
router.delete('/',          ctrl.clearCart);
router.post('/promo',       ctrl.applyPromo);

module.exports = router;

