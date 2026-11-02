const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/review.controller');

// Public
router.get('/product/:productId', ctrl.getProductReviews);

// Auth required
router.post(
  '/product/:productId',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1–5.'),
    body('body').trim().isLength({ min: 10 }).withMessage('Review must be at least 10 characters.'),
  ],
  validate,
  ctrl.createReview
);

router.put('/:id',    protect, ctrl.updateReview);
router.delete('/:id', protect, ctrl.deleteReview);

module.exports = router;

