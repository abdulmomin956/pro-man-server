const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController')


router.route('/')
    .post(workspaceController.addWorkspace)

router.route('/memberEmail/:userId')
    .get(workspaceController.getMembersWorkspaces)

router.route('/:email')
    .get(workspaceController.getWorkspaces)


module.exports = router;