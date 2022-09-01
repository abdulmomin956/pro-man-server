const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.route("/all")
    .get(usersController.allUsers)
    .post(usersController.addUser)

router.route("/pagination")
    .post(usersController.getUsers)

router.route("/:id")
    .get(usersController.singleUser)
    .put(usersController.makeAdmin)

module.exports = router;