/**
 * Created by Grant on 11/18/16.
 */
/**
 * Setup for the application.
 **/
var express = require('express'),
    bodyParser = require('body-parser'),
    ServerController = require('./serverModules/serverController/ServerController');
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

    app.use(bodyParser.json());

    new ServerController(app, config);

    app.on('error', function (error) {
        console.log(error);
    });

    process.on('uncaughtException', function (error) {
        console.error('Uncaught Exception: ', error.message);
        console.error(error.stack);
        process.exit(1);
    });

    console.log('Deployment check 4');
}

module.exports = startApp;