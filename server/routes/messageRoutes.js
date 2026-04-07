const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/inbox/:email', messageController.getInbox);
router.get('/history/:email1/:email2', messageController.getChatHistory);

module.exports = router;