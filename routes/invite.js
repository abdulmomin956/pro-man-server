const express = require("express");
const router = express.Router();
const inviteController = require("../controllers/inviteController");

router.post("/token", inviteController.handleInviteToken);
router.post("/verify", inviteController.handleVerifyToken);
router.put("/update-user", inviteController.handleUpdateMember);

module.exports = router;
