const express = require('express');
const overallPerformanceController = require('../controllers/overallPerformanceController');
const router = express.Router();
router.get('/',overallPerformanceController.backslash_route);
router.get('/home',overallPerformanceController.getOverallMatrix);
module.exports = router;

