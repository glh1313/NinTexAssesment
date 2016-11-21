var azure = require('azure-storage'),
    hitch = require('./hitch'),
    EntityConverterUtil = require('./EntityConverterUtil'),
    entGen = azure.TableUtilities.entityGenerator,
    entityConverterUtil = new EntityConverterUtil({excludeList: ['Timestamp', '.metadata', 'iat']});

function cleanUp(returnEntity, entity, key) {
    var value = entity[key];
    if (typeof value !== 'function') {
        if (typeof value === 'number') {
            value = value.toString();
        }
        returnEntity[key] = entGen.String(value);
    }
}

function convert(entity) {
    var returnEntity = {},
        keys = Object.keys(entity);

    if (keys) {
        keys.forEach(hitch(this, cleanUp, returnEntity, entity));
    }

    return returnEntity;
}

function utils(account, key) {
    var tableService = azure.createTableService(account, key);

    this.writeRowToTable = function (tableName, entity, callback) {
        tableService.insertEntity(tableName, convert(entity), function (error, result, response) {
            callback(error, entity);
        });
    };

    this.retrieveByKeys = function (tableName, keys, callback) {
        tableService.retrieveEntity(tableName, keys.PartitionKey, keys.RowKey, function(error, result, response) {
            if (!error) {
                entityConverterUtil.convertTableResultsToObject(result, callback);
            } else callback(error, response);
        });
    };

    this.retrieveByPK = function (tableName, partitionKey, callback) {
        var query = new azure.TableQuery().top(1).where('PartitionKey eq ?', partitionKey);

        tableService.queryEntities(tableName, query, null, function(error, result, response) {
            if (!error) {
                if (result.entries.length < 2) {
                    if (result.entries.length === 1) {
                        entityConverterUtil.convertTableResultsToObject(result.entries[0], callback);
                    }

                    if (result.entries.length === 0) {
                        callback(null, null);
                    }

                } else callback ('Error: There should only be one result per PartitionKey', result);
            } else callback(error, response);
        });

    };

    this.removeByKeys = function (tableName, keys, callback) {

    };
}

module.exports = utils;