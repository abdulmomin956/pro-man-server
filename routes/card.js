const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController')


router.route('/')
    .get(cardController.getCards)
    .post(cardController.addCard)



router.route('/:id')
    .get(cardController.getCard)
    .delete(cardController.updateCard)
    .patch(cardController.deleteCard)

module.exports = router;