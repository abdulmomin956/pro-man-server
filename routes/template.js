const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.route("/").get(templateController.getTemplates);

router
  .route("/category/:category")
  .get(templateController.getCategoryWiseTemplates);

router.route("/each/:id").get(templateController.getEachTemplate);

module.exports = router;
