const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController')


router.route('/')
    .post(boardController.addBoard)

router.route('/:workspaceID')
    .get(boardController.getBoards)

router.route('/b/:id')
    .get(boardController.getBoard)
    .delete(boardController.deleteBoard)
    .patch(boardController.updateBoard)

module.exports = router;