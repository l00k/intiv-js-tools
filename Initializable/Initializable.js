"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const def_1 = require("./def");
const PropertyDescriptor_1 = tslib_1.__importDefault(require("./PropertyDescriptor"));
class Initializable {
    constructor(data) {
    }
    setData(data) {
        if (!data) {
            return;
        }
        const Target = Object.getPrototypeOf(this);
        const mapping = Target[def_1.MappingSymbol] || {};
        const properties = Target[def_1.PropertySymbol] || {};
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
            if (rawValue === null) {
                this[property] = null;
            }
            else if (propertyDsrp.preserveRaw) {
                this[property] = rawValue;
            }
            else if (propertyDsrp.isPrimitive) {
                if (propertyDsrp.type === Boolean) {
                    this[property] = !!rawValue;
                }
                else if (propertyDsrp.type === Number) {
                    this[property] = +rawValue;
                }
                else if (propertyDsrp.type === BigInt) {
                    this[property] = BigInt(rawValue);
                }
                else {
                    this[property] = rawValue;
                }
            }
            else {
                if (propertyDsrp.isArray) {
                    this[property] = [];
                    if (rawValue instanceof Array) {
                        rawValue.forEach((elm) => {
                            let subElm = this._setDataSubObject(propertyDsrp.arrayOf, elm);
                            this[property].push(subElm);
                        });
                    }
                    else if (typeof rawValue == 'object') {
                        Object.keys(rawValue).forEach((idx) => {
                            let subElm = this._setDataSubObject(propertyDsrp.arrayOf, rawValue[idx]);
                            this[property].push(subElm);
                        });
                    }
                }
                else {
                    this[property] = this._setDataSubObject(propertyDsrp.type, rawValue);
                }
            }
        });
    }
    _setDataSubObject(type, rawValue) {
        if (type.prototype instanceof Initializable) {
            const object = new type();
            object.setData(rawValue);
            return object;
        }
        else {
            return new type(rawValue);
        }
    }
}
exports.default = Initializable;
