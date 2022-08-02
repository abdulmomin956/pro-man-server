const express = require('express');
const router = express.Router();
const workspaceController = require('../controllers/workspaceController')
// const workspace = workspaceController.store
// console.log(workspaceController);

router.route('/')
// .get(workspaceController.getWorkspaces)
// .post(workspace)
// .patch(workspaceController.updateWorkspace)
// .delete(workspaceController.deleteWorkspace)

// router.route('/:id')
//     .get(workspaceController.getWorkspace);

module.exports = router;