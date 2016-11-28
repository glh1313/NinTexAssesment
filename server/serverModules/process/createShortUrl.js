
var key = '3p2Os4obOCO5u04SCLItvm77uCOcIswFdsCp7vpnvFsS2Sw6Tb/0LMtuaGfS3dO0NQdBYbkAIVMvdG+Dkbu/2Q==',
    account = 'glhbit',
    tableName = 'urllookup',
    baseUrl = 'http://gbit.azurewebsites.net';
AzureTableServiceUtils = require('../../utils/AzureTableServiceUtils'),
    keyCreator = require('../../utils/keyCreator'),
    tableUtils = new AzureTableServiceUtils(account, key),
    async = require('async'),
    random = require('random-js');

function storeUrl (urlObject, callback) {
    var shortQuickLookup = {
        PartitionKey: urlObject.RowKey,
        RowKey: urlObject.PartitionKey,
        Url: urlObject.Url,
        ShortUrl: urlObject.ShortUrl,
        ShortUrlAsPartitionKey: true
    };

    function handleWriteCallback (error, results) {
        if (!error) {
            tableUtils.writeRowToTable(tableName, urlObject, callback);
        } else callback(error, results);
    }

    tableUtils.writeRowToTable(tableName, shortQuickLookup, handleWriteCallback);
}

function shortenUrl (urlObject, callback) {
    var engine = random.engines.nativeMath;

    urlObject.ShortUrl = baseUrl + '/' + random.hex(false)(engine, 8);

    keyCreator.createRowKey(urlObject, callback);
}

function  checkIfWeAlreadyHaveUrl (url, callback) {
    var urlObject = {};
    urlObject.Url = url;

    function handleCheckResults (error, results) {
        if (!error && results) {
            callback('We already have this url', results);
        } else if (!error && !results) {
            callback(null, urlObject);
        } else callback(error, results);
    }

    function handleKeyCreation (error, urlObject) {
        if (!error) {
            tableUtils.retrieveByPK(tableName, urlObject.PartitionKey, handleCheckResults);
        } else callback(error, urlObject);
    }

    keyCreator.createPartitionKey(urlObject, handleKeyCreation);
}

function incomingUrl (url, callback) {
    var composed = async.compose(storeUrl, shortenUrl, checkIfWeAlreadyHaveUrl);

    function returnResults (error, results) {
        if (!error || error === 'We already have this url') {
            callback(null, results);
        } else callback(error, results);
    }

    composed(url, returnResults);
}

module.exports = incomingUrl;

