var express = require('express');
var router = express.Router();
var qualificationsController = require('../controllers/qualificationsController.js');

/*
 * GET
 */
router.get('/', qualificationsController.list);

/*
 * GET
 */
router.get('/:id', qualificationsController.show);

/*
 * POST
 */
router.post('/', qualificationsController.create);

/*
 * PUT
 */
router.put('/:id', qualificationsController.update);

/*
 * DELETE
 */
router.delete('/:id', qualificationsController.remove);

module.exports = router;
