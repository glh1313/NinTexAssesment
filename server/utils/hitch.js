function toArray(obj, offset, startWith) {
    return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
}

function hitchMethodError(scope, method) {
    var message = [
        'hitch: scope["', method, '"] is null (scope="', scope, '")'
    ];

    return message.join('');
}

function hitchArguments (scope, method) {
    var pre = toArray(arguments, 2),
        named = (typeof method === 'string');

    function returnArguments() {
        var args = toArray(arguments),
            f = named ? (scope || this)[method] : method;


        return f && f.apply(scope || this, pre.concat(args));
    }

    return returnArguments
}

function baseHitch(scope, method) {
    if (arguments.length > 2) {
        return hitchArguments.apply(this, arguments);
    }

    if (!method) {
        method = scope;
        scope = null;
    }

    if (typeof method === 'string') {
        scope = scope || this;

        if (!scope[method]) { throw(this.hitchMethodError(scope, method)); }
        return function(){ return scope[method].apply(scope, arguments || []); };
    }

    return !scope ? method : function() { return method.apply(scope, arguments || []); };
}

module.exports = baseHitch;