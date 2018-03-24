var profileModel = require('../models/profileModel.js');

/**
 * profileController.js
 *
 * @description :: Server-side logic for managing profiles.
 */
module.exports = {

    /**
     * profileController.list()
     */
    list: function (req, res) {
        profileModel.find(function (err, profiles) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting profile.',
                    error: err
                });
            }
            return res.json(profiles);
        });
    },

    /**
     * profileController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        profileModel.findOne({_id: id}, function (err, profile) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting profile.',
                    error: err
                });
            }
            if (!profile) {
                return res.status(404).json({
                    message: 'No such profile'
                });
            }
            return res.json(profile);
        });
    },

    /**
     * profileController.create()
     */
    create: function (req, res) {
        var profile = new profileModel({
			name : req.body.name,
			description : req.body.description,
			status : req.body.status,

        });

        profile.save(function (err, profile) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating profile',
                    error: err
                });
            }
            return res.status(201).json(profile);
        });
    },

    /**
     * profileController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        profileModel.findOne({_id: id}, function (err, profile) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting profile',
                    error: err
                });
            }
            if (!profile) {
                return res.status(404).json({
                    message: 'No such profile'
                });
            }

            profile.name = req.body.name ? req.body.name : profile.name;
			profile.description = req.body.description ? req.body.description : profile.description;
			profile.status = req.body.status ? req.body.status : profile.status;
		
            profile.save(function (err, profile) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating profile.',
                        error: err
                    });
                }

                return res.json(profile);
            });
        });
    },

    /**
     * profileController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        profileModel.findByIdAndRemove(id, function (err, profile) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the profile.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
