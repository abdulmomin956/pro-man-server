const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");



router.route("/all/:boardID")
  .get(listController.getAllLists)
  .delete(listController.deleteAllList)

router.route("/b/:boardID")
  .get(listController.getLists)
  .post(listController.addList)

router.route("/l/:id")
  .delete(listController.deleteList)
  .patch(listController.updateList)

module.exports = router;
