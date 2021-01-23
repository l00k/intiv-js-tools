function isArray(v : any) : boolean
{
    return (!!v) && (v.constructor === Array);
}

function isObject(v : any) : boolean
{
    return v === Object(v);
}

function isPlainObject(v : any) : boolean
{
    return (!!v) && (v.constructor === Object);
}

function isFunction(v : any) : boolean
{
    return !!(v && v.constructor && v.call && v.apply);
}

function isArrowFunction(v : any) : boolean
{
    let native = v.toString().trim().endsWith('() { [native code] }');
    let plain = !native && v.hasOwnProperty('prototype');
    return isFunction(v) && !(native || plain);
}

function isset(expr : Function) : boolean
{
    try {
        expr();
        return typeof expr() != 'undefined' && expr() !== null;
    }
    catch (exception) {
        return false;
    }
}

function empty(expr : Function) : boolean
{
    try {
        let v : any = expr();
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

function coalesce(...exprs : Function[]) : boolean
{
    let v : any;
    let expr : Function;

    while (expr = exprs.shift()) {
        try {
            v = expr();

            if (typeof expr() != 'undefined' && expr() !== null) {
                return v;
            }
        }
        catch (exception) {}
    }

    return null;
}


export {
    isArray,
    isObject,
    isPlainObject,
    isFunction,
    isArrowFunction,
    isset,
    empty,
    coalesce,
};
