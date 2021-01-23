"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertySymbol = void 0;
require("reflect-metadata");
const PropertyDescriptor_1 = __importDefault(require("./PropertyDescriptor"));
exports.PropertySymbol = Symbol('Property');
function Property(options = {}) {
    return function (Target, property) {
        const TargetProto = Target.constructor.prototype;
        if (!TargetProto[exports.PropertySymbol]) {
            TargetProto[exports.PropertySymbol] = {};
        }
        if (!options.type && !options.preserveRaw) {
            options.type = Reflect.getMetadata('design:type', Target, property);
        }
        TargetProto[exports.PropertySymbol][property] = new PropertyDescriptor_1.default(options);
    };
}
exports.default = Property;
