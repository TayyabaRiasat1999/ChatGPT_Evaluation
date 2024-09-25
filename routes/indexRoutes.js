const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();
// redirecting the question routes by category
router.get('/history',indexController.domain_index);
router.get('/social_science', indexController.domain_index);
router.get('/computer_security', indexController.domain_index);
// domain routes
router.get('/index',indexController.domain_index)
module.exports = router;




