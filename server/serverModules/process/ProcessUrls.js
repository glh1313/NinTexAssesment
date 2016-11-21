
var key = '3p2Os4obOCO5u04SCLItvm77uCOcIswFdsCp7vpnvFsS2Sw6Tb/0LMtuaGfS3dO0NQdBYbkAIVMvdG+Dkbu/2Q==',
    account = 'glhbit',
    tableName = 'urllookup',
    baseUrl = 'http://glhbit.tk';
    AzureTableServiceUtils = require('../../utils/AzureTableServiceUtils'),
    keyCreator = require('../../utils/keyCreator'),
    tableUtils = new AzureTableServiceUtils(account, key),
    async = require('async');


function  checkIfWeAlreadyHaveUrl (url, callback) {
    var urlObject = {
        Url: url
    };

    function handleKeyCreation (error, urlObject) {
        if (!error) {
            tableUtils.retrieveByPK(tableName, urlObject.PartitionKey, callback);
        } else callback(error, urlObject);
    }

    keyCreator.createPartitionKey(urlObject, handleKeyCreation);
}

function incomingUrl (url, callback) {
    var composed = async.compose(checkIfWeAlreadyHaveUrl);

    function returnResults (error, results) {
        if (!error) {
            callback(null, results);
        } else callback(error, results);
    }

    composed(url, returnResults);
}

module.exports = incomingUrl;
