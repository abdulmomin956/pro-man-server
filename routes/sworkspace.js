const express = require('express');
const router = express.Router();
const sWorkspaceController = require('../controllers/sWorkspaceController')

router.route('/get/:shortname')
    .get(sWorkspaceController.getWorkspace)

router.route('/api/:id')
    .delete(sWorkspaceController.deleteWorkspace)
    .patch(sWorkspaceController.updateWorkspace)

module.exports = router;