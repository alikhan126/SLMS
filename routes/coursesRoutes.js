var express = require('express');
var router = express.Router();
var coursesController = require('../controllers/coursesController.js');

/*
 * GET
 */
router.get('/', coursesController.list);

/*
 * GET
 */
router.get('/:id', coursesController.show);

/*
 * POST
 */
router.post('/', coursesController.create);

/*
 * PUT
 */
router.put('/:id', coursesController.update);

/*
 * DELETE
 */
router.delete('/:id', coursesController.remove);

module.exports = router;
