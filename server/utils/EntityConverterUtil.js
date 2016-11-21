var hitch = require('./hitch'),
    async = require('async');


function getObjectFromTableEnitity (returnObject, azureTableResultsObject, excludeList, key, init, callback ) {
    function compareForArraySome(element, index, array) {
        return key === element;
    }

    if (excludeList && !excludeList.some(compareForArraySome)) {
        returnObject[key] = azureTableResultsObject[key]._
    }

    callback(null);
}

function convertTableResultsToObject(excludeList, azureTableResultsObject, callback) {
    var returnObject = {},
        keys = Object.keys(azureTableResultsObject);

    function returnResults(error) {
        callback(error, returnObject);
    }

    if (keys && keys.length) {
        async.forEachOf(keys, hitch(this, getObjectFromTableEnitity, returnObject, azureTableResultsObject, excludeList), returnResults);
    }
}

function entityConverterUtil (parmas) {
    var excludeList = (parmas && parmas.excludeList) ? parmas.excludeList : [];

    this.convertTableResultsToObject = hitch(this, convertTableResultsToObject, excludeList);
}

module.exports = entityConverterUtil;