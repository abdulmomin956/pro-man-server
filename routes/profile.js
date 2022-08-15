const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')

router.route('/')
    .get(profileController.getProfiles)
    .post(profileController.addProfile)



router.route('/:email')
    .get(profileController.getProfile)
    .patch(profileController.updateProfile)


module.exports = router;