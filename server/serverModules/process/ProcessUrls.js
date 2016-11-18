/**
 * Created by Grant on 11/18/16.
 */

var map = {
    '/55555': 'http://www.mlssoccer.com/post/2016/11/17/morris-aside-sounders-close-full-health-rapids-showdown-approaches'
};


function incomingUrl (url, callback) {
    if (map[url]) {
        callback(map[url]);
    }
}

module.exports = incomingUrl;