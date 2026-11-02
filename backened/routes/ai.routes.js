const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ai.controller');

router.get('/prompts', ctrl.getPrompts);
router.post('/chat',   ctrl.chat);

module.exports = router;

