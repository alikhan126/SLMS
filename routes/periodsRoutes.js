var express = require('express');
var router = express.Router();
var periodsController = require('../controllers/periodsController.js');

/*
 * GET
 */
router.get('/', periodsController.list);

/*
 * GET
 */
router.get('/:id', periodsController.show);

/*
 * POST
 */
router.post('/', periodsController.create);

/*
 * PUT
 */
router.put('/:id', periodsController.update);

/*
 * DELETE
 */
router.delete('/:id', periodsController.remove);

module.exports = router;
