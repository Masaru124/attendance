const express = require('express');
const { setupProfile } = require('../controllers/ProfileController');

const router = express.Router();

router.post('/setup', setupProfile);

module.exports = router;
