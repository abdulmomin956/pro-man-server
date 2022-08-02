const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController')


router.route('/')
    .get(boardController.getBoards)
    .post(boardController.addBoard)



router.route('/:id')
    .get(boardController.getBoard)
    .delete(boardController.deleteBoard)
    .patch(boardController.updateBoard)

module.exports = router;