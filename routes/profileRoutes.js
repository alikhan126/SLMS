var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController.js');

/*
 * GET
 */
router.get('/', profileController.list);

/*
 * GET
 */
router.get('/:id', profileController.show);

/*
 * POST
 */
router.post('/', profileController.create);

/*
 *  EXISTS
 */
router.post('/exists/:name', profileController.verify);

/*
 * PUT
 */
router.put('/:id', profileController.update);

/*
 * DELETE
 */
router.delete('/:id', profileController.remove);

module.exports = router;
