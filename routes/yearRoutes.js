var express = require('express');
var router = express.Router();
var yearController = require('../controllers/yearController.js');

/*
 * GET
 */
router.get('/', yearController.list);

/*
 * GET
 */
router.get('/:id', yearController.show);

/*
 * POST
 */
router.post('/', yearController.create);

/*
 * Exists
 */
router.post('/exists/:name', yearController.verify);

/*
 * PUT
 */
router.put('/:id', yearController.update);

/*
 * DELETE
 */
router.delete('/:id', yearController.remove);

module.exports = router;
