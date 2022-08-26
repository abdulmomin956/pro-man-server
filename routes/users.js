const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')

router.route("/")
.get( usersController.getUsers)
.post(usersController.addUser)
router.route("/:id")
.put(usersController.makeAdmin)

module.exports = router;