const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController')


router.route('/')
    .get(workspaceController.getWorkspaces)
    .post(workspaceController.addWorkspace)
    .patch(workspaceController.updateWorkspace)
    .delete(workspaceController.deleteWorkspace)

router.route('/:id')
    .get(workspaceController.getWorkspace);

module.exports = router;