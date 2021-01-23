"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coalesce = exports.empty = exports.isset = exports.isArrowFunction = exports.isFunction = exports.isPlainObject = exports.isObject = exports.isArray = void 0;
function isArray(v) {
    return (!!v) && (v.constructor === Array);
}
exports.isArray = isArray;
function isObject(v) {
    return v === Object(v);
}
exports.isObject = isObject;
function isPlainObject(v) {
    return (!!v) && (v.constructor === Object);
}
exports.isPlainObject = isPlainObject;
function isFunction(v) {
    return !!(v && v.constructor && v.call && v.apply);
}
exports.isFunction = isFunction;
function isArrowFunction(v) {
    let native = v.toString().trim().endsWith('() { [native code] }');
    let plain = !native && v.hasOwnProperty('prototype');
    return isFunction(v) && !(native || plain);
}
exports.isArrowFunction = isArrowFunction;
function isset(expr) {
    try {
        expr();
        return typeof expr() != 'undefined' && expr() !== null;
    }
    catch (exception) {
        return false;
    }
}
exports.isset = isset;
function empty(expr) {
    try {
        let v = expr();
        if (isArray(v)) {
            return !v.length;
        }
        if (isPlainObject(v)) {
            return !Object.keys(v).length;
        }
        return !v;
    }
    catch (exception) {
        return true;
    }
}
exports.empty = empty;
function coalesce(...exprs) {
    let v;
    let expr;
    while (expr = exprs.shift()) {
        try {
            v = expr();
            if (typeof expr() != 'undefined' && expr() !== null) {
                return v;
            }
        }
        catch (exception) { }
    }
    return null;
}
exports.coalesce = coalesce;
