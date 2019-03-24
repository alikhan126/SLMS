var qualificationsModel = require('../models/qualificationsModel.js');

/**
 * qualificationsController.js
 *
 * @description :: Server-side logic for managing qualificationss.
 */
module.exports = {

    /**
     * qualificationsController.list()
     */
    list: function (req, res) {
        qualificationsModel.find(function (err, qualificationss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting qualifications.',
                    error: err
                });
            }
            return res.json(qualificationss);
        });
    },

    /**
     * qualificationsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        qualificationsModel.findOne({_id: id}, function (err, qualifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting qualifications.',
                    error: err
                });
            }
            if (!qualifications) {
                return res.status(404).json({
                    message: 'No such qualifications'
                });
            }
            return res.json(qualifications);
        });
    },

    /**
     * qualificationsController.create()
     */
    create: function (req, res) {
        var qualifications = new qualificationsModel({
			Title : req.body.Title

        });

        qualifications.save(function (err, qualifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating qualifications',
                    error: err
                });
            }
            return res.status(201).json(qualifications);
        });
    },

    /**
     * qualificationsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        qualificationsModel.findOne({_id: id}, function (err, qualifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting qualifications',
                    error: err
                });
            }
            if (!qualifications) {
                return res.status(404).json({
                    message: 'No such qualifications'
                });
            }

            qualifications.Title = req.body.Title ? req.body.Title : qualifications.Title;
			
            qualifications.save(function (err, qualifications) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating qualifications.',
                        error: err
                    });
                }

                return res.json(qualifications);
            });
        });
    },

    /**
     * qualificationsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        qualificationsModel.findByIdAndRemove(id, function (err, qualifications) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the qualifications.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
