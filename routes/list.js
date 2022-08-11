const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");

router.route("/").post(listController.addList);

router.route("/:boardID").get(listController.getLists);

router
  .route("/:id")
  //   .get(listController.getList)
  .delete(listController.deleteList)
  .patch(listController.updateList);

module.exports = router;
