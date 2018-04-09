var express = require('express');
var router = express.Router();
var leaveTypesController = require('../controllers/leaveTypesController.js');

/*
 * GET
 */
router.get('/', leaveTypesController.list);

/*
 * GET
 */
router.get('/:id', leaveTypesController.show);

/*
 * POST
 */
router.post('/', leaveTypesController.create);

/*
 * PUT
 */
router.put('/:id', leaveTypesController.update);

/*
 * DELETE
 */
router.delete('/:id', leaveTypesController.remove);

module.exports = router;
