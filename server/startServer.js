/**
 * Created by Grant on 11/18/16.
 */
/**
 * Setup for the application.
 **/
var express = require('express'),
    bodyParser = require('body-parser');
    // ServerController = require('./serverModules/serverController/ServerController');
    // loggingManagement = require('./serverModules/loggingManagement/LoggingManagement');

/**
 * Start up for the application.
 *
 * @param {Object} config - config object
 *
 * Note: Mostly boilerplate code
 **/
function startApp (config) {
    var app = express();


    app.set('env', 'production');
    app.set('port', process.env.port || 3000);
    app.disable('etag');

    // loggingManagement(app, config);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // new ServerController(app, config);

    app.get('/', function (req, res) {
        res.send('This is a start too!');
    });

    app.listen(app.get('port'), function () {
        console.log('Server started');
    });
}

module.exports = startApp;