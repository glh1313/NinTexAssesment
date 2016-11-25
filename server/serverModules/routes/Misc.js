/**
 * Created by Grant on 11/18/16.
 */
var path = require('path'),
    proccess = require('../process/ProcessUrls'),
    baseUrl = 'http://glhbit.tx';

function root(app, config) {
    app.get('/*', function (req, res, next) {
        if (req.originalUrl !== "/" && req.originalUrl !== '/__webpack_hmr' && req.originalUrl !=='/favicon.ico' && req.originalUrl !=='/create') {
            console.log('Incoming URL: ' + baseUrl + req.originalUrl);
            proccess(baseUrl + req.originalUrl, function (error, results) {
                if (!error && results) {
                    console.log('Outging URL: ' + baseUrl + req.originalUrl);
                    res.statusCode(301);
                    res.redirect(results.Url);
                } else {
                    res.statusCode(404).end();
                }
            });
        } else {
            console.log('We skipped URL Processing!');
            next();
        }
    });
}

module.exports = root;