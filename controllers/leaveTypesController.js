var leaveTypesModel = require('../models/leaveTypesModel.js');

/**
 * leaveTypesController.js
 *
 * @description :: Server-side logic for managing leaveTypess.
 */
module.exports = {

    /**
     * leaveTypesController.list()
     */
    list: function (req, res) {
        leaveTypesModel.find(function (err, leaveTypess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting leaveTypes.',
                    error: err
                });
            }
            return res.json(leaveTypess);
        });
    },

    /**
     * leaveTypesController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        leaveTypesModel.findOne({_id: id}, function (err, leaveTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting leaveTypes.',
                    error: err
                });
            }
            if (!leaveTypes) {
                return res.status(404).json({
                    message: 'No such leaveTypes'
                });
            }
            return res.json(leaveTypes);
        });
    },

    /**
     * leaveTypesController.create()
     */
    create: function (req, res) {
        var leaveTypes = new leaveTypesModel({
			title : req.body.title

        });

        leaveTypes.save(function (err, leaveTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating leaveTypes',
                    error: err
                });
            }
            return res.status(201).json(leaveTypes);
        });
    },

    /**
     * leaveTypesController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        leaveTypesModel.findOne({_id: id}, function (err, leaveTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting leaveTypes',
                    error: err
                });
            }
            if (!leaveTypes) {
                return res.status(404).json({
                    message: 'No such leaveTypes'
                });
            }

            leaveTypes.title = req.body.title ? req.body.title : leaveTypes.title;
			
            leaveTypes.save(function (err, leaveTypes) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating leaveTypes.',
                        error: err
                    });
                }

                return res.json(leaveTypes);
            });
        });
    },

    /**
     * leaveTypesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        leaveTypesModel.findByIdAndRemove(id, function (err, leaveTypes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the leaveTypes.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
