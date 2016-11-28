/**
 * Created by Grant on 11/18/16.
 */
var path = require('path'),
    url = require('url'),
    proccess = require('../process/ProcessUrls');

var excludeList = {
    '/server.js/debug': true,
    '/favicon.ico': true,
    '/__webpack_hmr': true,
    '/': true
};


function root(app, config) {
    app.get('/*', function (req, res, next) {
        var requestedUrl = req.headers.host ? req.headers.host : 'http://localhost:' + app.get('port') + req.originalUrl,
            incomingUrlObject = url.parse(requestedUrl);

        console.log('We have a request for: ' + requestedUrl);
        console.log(req.headers);

        if ((excludeList[incomingUrlObject.path] ? false : true)) {
            console.log('Incoming URL: ' + requestedUrl);
            proccess(requestedUrl, function (error, results) {
                if (!error && results) {
                    console.log('Outgoing URL: ' + results.Url);

                    res.redirect(301, results.Url);
                } else {
                    res.statusCode = 404;
                    res.end();

                }
            });
        } else {
            console.log('We skipped URL Processing!');
            next();
        }
    });
}

module.exports = root;