module.exports = function(query, sep, eq) {
    if ((typeof query == 'undefined') || (!query)) {
        return {};
    }

    sep = sep || '&';
    eq = eq || '=';

    query = query.split(sep);

    var result = {}, tmp;
    for(var i = 0; i < query.length; i++) {
        if (query[i]) {
            tmp = query[i].match(new RegExp('^([^' + eq + ']+)' + eq + '(.*)$', 'mi'));

            if ((tmp) && (tmp.length > 1) && (tmp[1] != '')) {
                parse(result, tmp[1], decodeURIComponent(tmp[2] || ''));
            }
        }
    }

    return result;
};

function parse(result, name, value) {
    if (name.indexOf('[') < 0) {
        if (typeof result[name] == 'undefined') {
            result[name] = value;
        } else if (typeof result[name] == 'object'){
            if (result[name] instanceof Array) {
                result[name].push(value);
            } else {
                result[name] = value;
            }
        } else {
            result[name] = [result[name], value];
        }

        return;
    }

    var params = parseParams(name);
    name = name.substr(0, name.indexOf('['));

    result[name] = sfda(result[name] || null, params, value);
}

function objectType(result) {
    return Object.prototype.toString.call(result).toLowerCase().split(' ')[1].replace(']', '');
}

function sfda(obj, params, value) {
    if (params.length == 0) {
        return value;
    }

    var param = params.shift(),
        type = objectType(obj);

    if (param === '') {
        // Массив

        if ((typeof obj == 'undefined') || (!obj)) {
            obj = [];
        } else {
            if ((type != 'array') && (type != 'object')) {
                obj = {};
            }
        }

        if (objectType(obj) == 'array') {
            obj.push(sfda(null, params, value));
        } else {
            params.unshift(getObjectKeyArray(obj));
            obj = sfda(obj, params, value);
        }

        return obj;
    } else {
        // Объект

        if ((typeof obj == 'undefined') || (!obj)) {
            obj = {};
        } else {
            if (type != 'object') {
                if (type == 'array') {
                    obj = toObject(obj);
                } else {
                    obj = {};
                }
            }
        }

        obj[param] = sfda(obj[param] || null, params, value);
        return obj;
    }
}

function getObjectKeyArray(obj) {
    var keys = Object.keys(obj), result = 0;

    for(var i = 0; i < keys.length; i++) {
        if ((!isNaN(keys[i])) && (result <= parseInt(keys[i]))) {
            result = parseInt(keys[i]) + 1;
        }
    }

    return result;
}

function parseParams(name) {
    var params = name.match(/(\[[^\]]*?\])/g),
        result = [];

    params.forEach(function(v) {
        result.push(v.substr(1, v.length - 2));
    });

    return result;
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}