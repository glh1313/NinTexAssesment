import browserCheck from './browserCheck';

function slow() {
    function fn(obj, offset, startWith){
        var arr = startWith||[];
        for(var x = offset || 0; x < obj.length; x++){
            arr.push(obj[x]);
        }
        return arr;
    }

    return function(obj){
        return ((obj.item) ? fn : efficient).apply(this, arguments);
    };
}

function efficient(obj, offset, startWith) {
    return (startWith || []).concat(Array.prototype.slice.call(obj, offset || 0));
}

function toArray(obj, offset, startWith) {
    return browserCheck.isIE() ? slow(obj, offset, startWith) : efficient(obj, offset, startWith);
}

export default toArray;