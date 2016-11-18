/**
 * Created by Grant on 11/18/16.
 */
var path = require('path');

function root(app, config) {
    app.get('/bundle.js', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../../application/build/bundle.js'));
    });
}

module.exports = root;