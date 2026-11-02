const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/category.controller');

router.get('/', ctrl.getCategories);
router.post('/', protect, adminOnly, ctrl.createCategory);
router.put('/:id', protect, adminOnly, ctrl.updateCategory);

module.exports = router;

