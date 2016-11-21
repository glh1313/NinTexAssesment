/**
 * Created by Grant on 11/18/16.
 */
var path = require('path'),
    proccess = require('../process/ProcessUrls'),
    baseUrl = 'http://glhbit.tk';

function root(app, config) {
    app.get('/*', function (req, res, next) {
        if (req.originalUrl !== "/" && req.originalUrl !== '/__webpack_hmr' && req.originalUrl !=='/favicon.ico' && req.originalUrl !=='/create') {
            proccess(baseUrl + req.originalUrl, function (error, results) {
                if (!error && results) {
                    res.statusCode(301);
                    res.redirect(results.Url);
                } else {
                    res.statusCode(404).end();
                }
            });
        } else {
            next();
        }
    });
}

module.exports = root;