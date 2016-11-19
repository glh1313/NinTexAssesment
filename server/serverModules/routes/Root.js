/**
 * Sets up the root URL.
 *
 * @param {Object} app - the application object.
 * @param {Object} config - the configuration object. This
 *                          object may not be needed but is
 *                          passed in for consistency.
 *
 * Note: This class places the jade template in memory when
 *       the server is started up. The template is static so
 *       it doesn't change.
 **/
var path = require('path');

function root(app, config) {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../../../application/build/index.html'));
    });
}

module.exports = root;