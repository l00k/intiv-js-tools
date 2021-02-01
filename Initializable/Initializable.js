"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const def = require("./def");
const PropertyDescriptor = __importDefault(require("./PropertyDescriptor"));

function Initializable(Source) {
    const Extended = function (...args) {
        const object = new Source(...args);
        if (args[0] instanceof Object) {
            object.setData(args[0]);
        }
        return object;
    };
    Extended.prototype = Source.prototype;
    Extended.prototype.setData = function (data) {
        if (!data) {
            return;
        }
        const Target = Object.getPrototypeOf(this);
        const mapping = Target[def.PropertySymbol] || {};
        const properties = Target[def.PropertySymbol] || {};
        Object.entries(data)
            .forEach(([fieldName, rawValue]) => {
            const property = mapping[fieldName]
                ? mapping[fieldName]
                : fieldName;
            let propertyDsrp = properties[property];
            if (!propertyDsrp) {
                propertyDsrp = new PropertyDescriptor.default({ preserveRaw: true });
            }
            // population blocked
            if (!propertyDsrp.populate) {
                return;
            }
            // null value case
            if (rawValue === null) {
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
                            let subElm = new propertyDsrp.arrayOf(elm);
                            this[property].push(subElm);
                        });
                    }
                    else if (typeof rawValue == 'object') {
                        Object.keys(rawValue).forEach((idx) => {
                            let subElm = new propertyDsrp.arrayOf(rawValue[idx]);
                            this[property].push(subElm);
                        });
                    }
                }
                // mapping objects
                else {
                    this[property] = new propertyDsrp.type(rawValue);
                }
            }
        });
    };

    Object.assign(Extended, Source);
    Object.defineProperty(Extended, 'name', { value: Source.name });

    return Extended;
}
exports.default = Initializable;
