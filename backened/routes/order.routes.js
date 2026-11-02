const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/order.controller');

router.use(protect);

router.post('/',          ctrl.placeOrder);
router.get('/',           ctrl.getMyOrders);
router.get('/:id',        ctrl.getOrder);
router.put('/:id/cancel', ctrl.cancelOrder);

module.exports = router;

