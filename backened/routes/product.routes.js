const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/product.controller');

// Public routes
router.get('/',                 ctrl.getProducts);
router.get('/category/:slug',   ctrl.getProductsByCategory);
router.get('/:id',              ctrl.getProductById);

// Admin CRUD
router.post('/',    protect, adminOnly, ctrl.createProduct);
router.put('/:id',  protect, adminOnly, ctrl.updateProduct);
router.delete('/:id', protect, adminOnly, ctrl.deleteProduct);

module.exports = router;

