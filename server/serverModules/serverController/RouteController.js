/**
 * Sets up the routes. This class is designed to load
 * all the files found in the routes folder
 *
 * @param {Object} app - the application object.
 * @param {Object} config - the configuration object. This
 *                          object may not be needed but is
 *                          passed in for consistency.
 *
 * Note: The current plan is to create a similar
 *       class for loading services.
 **/
var fs = require('fs'),
    path = require('path');

function routeController(app, config) {
    fs.readdir(path.resolve(__dirname, '../routes'), function (error, files) {
        if (!error && files.length) {
            files.forEach(function(fileName) {
                var file = require('../routes/' + fileName);
                new file(app, config);
            });
        }
    });
}

module.exports = routeController;