"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Property_1 = require("./Property");
class Initializer {
    static initializeObject(data, mapping = {}) {
        if (!data) {
            return;
        }
        const Target = Object.getPrototypeOf(this);
        const properties = Target[Property_1.PropertySymbol] || {};
        Object.keys(data)
            .forEach(fieldName => {
            const rawValue = data[fieldName];
            const property = mapping[fieldName]
                ? mapping[fieldName]
                : fieldName;
            const propertyDsrp = properties[property];
            if (!propertyDsrp) {
                return;
            }
            // null value case
            if (rawValue === null) {
                if (!propertyDsrp.isNullable) {
                    // property not nullable
                    throw `Property ${property} can not be set to null`;
                }
                this[property] = null;
            }
            // primitive values stay "simple"
            else if (propertyDsrp.isPrimitive) {
                if (propertyDsrp.type === Boolean) {
                    this[property] = !!rawValue;
                }
                else if (propertyDsrp.type === Number) {
                    this[property] = +rawValue;
                }
                else {
                    this[property] = rawValue;
                }
            }
            else {
                // array case
                if (propertyDsrp.isArray) {
                    this[property] = [];
                    if (rawValue instanceof Array) {
                        rawValue.forEach((elm) => {
                            let subElm = new (propertyDsrp.arrayOf)(elm);
                            this[property].push(subElm);
                        });
                    }
                    else if (typeof rawValue == 'object') {
                        Object.keys(rawValue).forEach((idx) => {
                            let subElm = new (propertyDsrp.arrayOf)(rawValue[idx]);
                            this[property].push(subElm);
                        });
                    }
                }
                // mapping objects
                else {
                    this[property] = new (propertyDsrp.type)(rawValue);
                }
            }
        });
    }
}
function InitializerList(mapping = {}) {
    return (Target) => {
        const ExtClass = class extends Target {
            constructor(...args) {
                super(...args);
                if (typeof args[0] === 'object' && args instanceof Object) {
                    const data = args[0];
                    Initializer.initializeObject.call(this, data, mapping);
                }
            }
        };
        // copy static variables
        Object.assign(ExtClass, Target);
        // assign name
        Object.defineProperty(ExtClass, 'name', { value: Target.name });
        return ExtClass;
    };
}
exports.default = InitializerList;
