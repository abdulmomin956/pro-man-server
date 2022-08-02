const express = require('express');
const router = express.Router();
const mongoController = require('../controllers/mongoController')

router.get('/', mongoController.testMongo)

module.exports = router;