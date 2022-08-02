const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController')


router.route('/')
    .post(workspaceController.addWorkspace)

router.route('/:email')
    .get(workspaceController.getWorkspaces)



router.route('/:id')
    .get(workspaceController.getWorkspace)
    .delete(workspaceController.deleteWorkspace)
    .patch(workspaceController.updateWorkspace)

module.exports = router;