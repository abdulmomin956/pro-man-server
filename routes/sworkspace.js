const express = require('express');
const router = express.Router();
const sWorkspaceController = require('../controllers/sWorkspaceController')


router.route('/:id')
    .get(sWorkspaceController.getWorkspace)
    .delete(sWorkspaceController.deleteWorkspace)
    .patch(sWorkspaceController.updateWorkspace)

module.exports = router;