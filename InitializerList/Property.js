"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = require("./def");
const PropertyDescriptor_1 = __importDefault(require("./PropertyDescriptor"));
function Property(options = {}) {
    return function (Target, property) {
        if (!Target[def_1.PropertySymbol]) {
            Target[def_1.PropertySymbol] = {};
        }
        if (!options.type && !options.preserveRaw) {
            options.type = Reflect.getMetadata('design:type', Target, property);
        }
        Target[def_1.PropertySymbol][property] = new PropertyDescriptor_1.default(options);
    };
}
exports.default = Property;
