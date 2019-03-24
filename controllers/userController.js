var userModel = require('../models/userModel.js');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        userModel.find({_id : {$ne : req.session._id}},function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new userModel({
			firstName : req.body.firstName,
			lastName : req.body.lastName,
      email : req.body.email,
			contactNumber : req.body.contactNumber,
			photo : req.body.photo,
			address : req.body.address,
			dateOfBirth : req.body.dateOfBirth,
			placeOfBirth : req.body.placeOfBirth,
			branch : req.body.branch,
			profile : req.body.profile,
			password : req.body.password

        });

        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }
            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        userModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
			user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
			user.contactNumber = req.body.contactNumber ? req.body.contactNumber : user.contactNumber;
            user.email = req.body.email ? req.body.email : user.email;
            user.photo = req.body.photo ? req.body.photo : user.photo;
			user.address = req.body.address ? req.body.address : user.address;
			user.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : user.dateOfBirth;
			user.placeOfBirth = req.body.placeOfBirth ? req.body.placeOfBirth : user.placeOfBirth;
			user.branch = req.body.branch ? req.body.branch : user.branch;
			user.profile = req.body.profile ? req.body.profile : user.profile;
      if(req.body.password && req.body.password.trim()!=""){
         user.password = req.body.password;
      }
			//user.password = (req.body.password || req.body.password!="") ? req.body.password : user.password;



            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        userModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
