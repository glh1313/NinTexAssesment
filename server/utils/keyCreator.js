/**
 * Created by Grant on 11/19/16.
 */
var crypto = require('crypto');

function createKey (urlToConvert, callback) {
    var returnValue;
    if (urlToConvert) {
        returnValue = crypto.createHash('sha1').update(urlToConvert).digest('hex');

        if (returnValue) {
            callback(null, returnValue);
        } else callback('Failed to create key');
    } else callback('Missing URL');
}

function createRowKey (urlObject, callback) {
    function handleResults (error, results) {
        if (!error) {
            urlObject.RowKey = results;
            callback(null, urlObject);
        } else callback(error, results);
    }

    createKey(urlObject.ShortUrl, handleResults);
}

function createPartitionKey (urlObject, callback) {
    function handleResults (error, results) {
        if (!error) {
            urlObject.PartitionKey = results;
            callback(null, urlObject);
        } else callback(error, results);
    }

    createKey(urlObject.Url, handleResults);
}

module.exports.createPartitionKey = createPartitionKey;
module.exports.createRowKey = createRowKey;