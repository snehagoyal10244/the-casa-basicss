const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/support.controller');

router.post('/tickets',              ctrl.createTicket);   // allow unauthenticated (guest can submit)
router.get('/tickets',    protect,   ctrl.getMyTickets);
router.post('/tickets/:id/message', protect, ctrl.addMessage);

module.exports = router;

