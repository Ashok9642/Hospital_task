const express = require('express');
const router = express.Router();

const { getMessages } = require('../controllers/messageController');

router.get('/:doctorId/:patientId', getMessages);

module.exports = router;
