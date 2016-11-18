/**
 * Created by Grant on 11/18/16.
 */
var path = require('path'),
    proccess = require('../process/ProcessUrls');

function root(app, config) {
    app.get('/*', function (req, res, next) {
        if (req.originalUrl !== "/" && req.originalUrl !== '/__webpack_hmr') {
            proccess(req.originalUrl, function (sendTo, error) {
                if (!error) {
                    res.redirect(sendTo);
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