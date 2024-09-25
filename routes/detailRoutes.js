const express = require('express');
const detailController = require('../controllers/detailController');

const router = express.Router();

router.get('/history/:id',detailController.detail);
router.get('/social_science/:id', detailController.detail);
router.get('/computer_security/:id',detailController.detail);

module.exports = router;

