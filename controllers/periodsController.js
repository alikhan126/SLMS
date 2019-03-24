var periodsModel = require('../models/periodsModel.js');

/**
 * periodsController.js
 *
 * @description :: Server-side logic for managing periodss.
 */
module.exports = {

    /**
     * periodsController.list()
     */
    list: function (req, res) {
        periodsModel.find(function (err, periodss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting periods.',
                    error: err
                });
            }
            return res.json(periodss);
        });
    },

    /**
     * periodsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        periodsModel.findOne({_id: id}, function (err, periods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting periods.',
                    error: err
                });
            }
            if (!periods) {
                return res.status(404).json({
                    message: 'No such periods'
                });
            }
            return res.json(periods);
        });
    },

    /**
     * periodsController.create()
     */
    create: function (req, res) {
        var periods = new periodsModel({
			start : req.body.start,
			end : req.body.end,
			title : req.body.title

        });

        periods.save(function (err, periods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating periods',
                    error: err
                });
            }
            return res.status(201).json(periods);
        });
    },

    /**
     * periodsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        periodsModel.findOne({_id: id}, function (err, periods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting periods',
                    error: err
                });
            }
            if (!periods) {
                return res.status(404).json({
                    message: 'No such periods'
                });
            }

            periods.start = req.body.start ? req.body.start : periods.start;
			periods.end = req.body.end ? req.body.end : periods.end;
			periods.title = req.body.title ? req.body.title : periods.title;
			
            periods.save(function (err, periods) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating periods.',
                        error: err
                    });
                }

                return res.json(periods);
            });
        });
    },

    /**
     * periodsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        periodsModel.findByIdAndRemove(id, function (err, periods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the periods.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
