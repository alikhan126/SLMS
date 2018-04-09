var yearModel = require('../models/yearModel.js');

/**
 * yearController.js
 *
 * @description :: Server-side logic for managing years.
 */
module.exports = {

    /**
     * yearController.list()
     */
    list: function (req, res) {
        yearModel.find(function (err, years) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting year.',
                    error: err
                });
            }
            return res.json(years);
        });
    },

    /**
     * yearController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        yearModel.findOne({_id: id}, function (err, year) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting year.',
                    error: err
                });
            }
            if (!year) {
                return res.status(404).json({
                    message: 'No such year'
                });
            }
            return res.json(year);
        });
    },

    /**
     * yearController.create()
     */
    create: function (req, res) {
        var year = new yearModel({
			name : req.body.name

        });

        year.save(function (err, year) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating year',
                    error: err
                });
            }
            return res.status(201).json(year);
        });
    },

    /**
     * yearController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        yearModel.findOne({_id: id}, function (err, year) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting year',
                    error: err
                });
            }
            if (!year) {
                return res.status(404).json({
                    message: 'No such year'
                });
            }

            year.name = req.body.name ? req.body.name : year.name;
			
            year.save(function (err, year) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating year.',
                        error: err
                    });
                }

                return res.json(year);
            });
        });
    },

    /**
     * yearController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        yearModel.findByIdAndRemove(id, function (err, year) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the year.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    /*
    * yearController.verify()  
    */
    verify: function(req, res) {
      var name = req.params.name;
      yearModel.findOne({name : name}, function (err, year) {
          if (err || !year) {
              return res.status(200).json();
          }
          return res.status(500).json();
      });
    }
};
