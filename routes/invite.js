const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteController");

router.post("/token", inviteController.handleInviteToken);
router.post("/verify", inviteController.handleVerifyToken);

module.exports = router;
