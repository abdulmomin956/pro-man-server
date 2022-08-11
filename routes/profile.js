const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

router.route('/')
    .get(profileController.getCards)
    .post(profileController.addProfile)



router.route('/:email')
    .get(profileController.getProfile)
    .delete(profileController.updateCard)


module.exports = router;