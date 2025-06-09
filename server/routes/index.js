// server/routes/index.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

/**
 * App Routes
 */
router.get('/', mainController.homepage);
router.get('/features', mainController.features);
router.get('/faqs', mainController.faqs);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);

module.exports = router;