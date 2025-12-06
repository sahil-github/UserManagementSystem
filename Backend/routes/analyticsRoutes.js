// backend/routes/analyticsRoutes.js
const express = require('express');
const { getUsersByLocation } = require('../controllers/analyticsController');

const router = express.Router();

router.get('/users-by-location', getUsersByLocation);

module.exports = router;