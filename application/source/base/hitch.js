import toArray from './toArray';

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
            f = named ? (scope || window)[method] : method;


        return f && f.apply(scope || this, pre.concat(args));
    }

    return returnArguments
}

function hitch (scope, method) {
    if (arguments.length > 2) {
        return hitchArguments.apply(window, arguments);
    }

    if (!method) {
        method = scope;
        scope = null;
    }

    if (typeof method === 'string') {
        scope = scope || window;

        if (!scope[method]) { throw(this.hitchMethodError(scope, method)); }
        return function(){ return scope[method].apply(scope, arguments || []); };
    }

    return !scope ? method : function() { return method.apply(scope, arguments || []); };
}

export default hitch;