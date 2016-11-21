var path = require('path'),
    proccess = require('../process/createShortUrl');

function root(app, config) {
    app.post('/create', function (req, res, next) {
        var url = req.body.url;
        if (url) {
            proccess(url, function (error, results) {
                if (!error && results) {
                    res.send(results);
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
