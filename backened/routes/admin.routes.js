const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/admin.controller');

// All admin routes require JWT + admin role
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard', ctrl.getDashboard);

// Users
router.get('/users',                ctrl.getUsers);
router.put('/users/:id/toggle',     ctrl.toggleUserStatus);

// Orders
router.get('/orders',               ctrl.getAllOrders);
router.put('/orders/:id/status',    ctrl.updateOrderStatus);

// Reviews
router.get('/reviews',              ctrl.getAllReviews);
router.put('/reviews/:id/moderate', ctrl.moderateReview);

// Support tickets
router.get('/tickets',              ctrl.getAllTickets);
router.put('/tickets/:id/status',   ctrl.updateTicketStatus);

module.exports = router;

