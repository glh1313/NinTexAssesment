/**
 * Sets up the Server and connects the routes.
 *
 * @param {Object} app - the application object.
 * @param {Object} config - the configuration object. This
 *                          object may not be needed but is
 *                          passed in for consistency.
 *
 * Note: This class may be modified later to create
 *       different servers (http vs. https) depending
 *       on the config parameters.
 **/
var RouteController = require('./RouteController');

function serverController(app, config) {

    new RouteController(app, config);

    app.listen(3000, function () {
        console.log('Server started');
    });
}

module.exports = serverController;