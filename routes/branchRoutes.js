var express = require('express');
var router = express.Router();
var branchController = require('../controllers/branchController.js');

/*
 * GET
 */
router.get('/', branchController.list);

/*
 * GET
 */
router.get('/:id', branchController.show);

/*
 * POST
 */
router.post('/', branchController.create);

/*
 * Exists
 */
router.post('/exists/:name', branchController.verify);

/*
 * PUT
 */
router.put('/:id', branchController.update);

/*
 * DELETE
 */
router.delete('/:id', branchController.remove);

module.exports = router;
