"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = require("./def");
const PropertyDescriptor_1 = __importDefault(require("./PropertyDescriptor"));
class Initializable {
    constructor(...args) {
        if (args[0] instanceof Object) {
            this.setData(args[0]);
        }
    }
    setData(data) {
        const me = this;
        if (!data) {
            return;
        }
        const Target = Object.getPrototypeOf(this);
        const mapping = Target[def_1.PropertySymbol];
        const properties = Target[def_1.PropertySymbol];
        Object.entries(data)
            .forEach(([fieldName, rawValue]) => {
            const property = mapping[fieldName]
                ? mapping[fieldName]
                : fieldName;
            let propertyDsrp = properties[property];
            if (!propertyDsrp) {
                propertyDsrp = new PropertyDescriptor_1.default({ preserveRaw: true });
            }
            // population blocked
            if (!propertyDsrp.populate) {
                return;
            }
            // null value case
            if (rawValue === null) {
                me[property] = null;
            }
            // primitive values stay "simple"
            else if (propertyDsrp.isPrimitive) {
                if (propertyDsrp.type === Boolean) {
                    me[property] = !!rawValue;
                }
                else if (propertyDsrp.type === Number) {
                    me[property] = +rawValue;
                }
                else {
                    me[property] = rawValue;
                }
            }
            else {
                // array case
                if (propertyDsrp.isArray) {
                    // @ts-ignore
                    this[property] = [];
                    if (rawValue instanceof Array) {
                        rawValue.forEach((elm) => {
                            let subElm = new propertyDsrp.arrayOf(elm);
                            me[property].push(subElm);
                        });
                    }
                    else if (typeof rawValue == 'object') {
                        Object.keys(rawValue).forEach((idx) => {
                            let subElm = new propertyDsrp.arrayOf(rawValue[idx]);
                            me[property].push(subElm);
                        });
                    }
                }
                // mapping objects
                else {
                    me[property] = new propertyDsrp.type(rawValue);
                }
            }
        });
    }
}
exports.default = Initializable;
