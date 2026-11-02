const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const ctrl = require('../controllers/bundle.controller');

router.get('/',     ctrl.getBundles);
router.get('/:id',  ctrl.getBundleById);
router.post('/',    protect, adminOnly, ctrl.createBundle);
router.put('/:id',  protect, adminOnly, ctrl.updateBundle);

module.exports = router;

