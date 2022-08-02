const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController')


router.route('/')
    .get(workspaceController.getWorkspaces)
    .post(workspaceController.addWorkspace)



router.route('/:id')
    .get(workspaceController.getWorkspace)
    .delete(workspaceController.deleteWorkspace)
    .patch(workspaceController.updateWorkspace)

module.exports = router;