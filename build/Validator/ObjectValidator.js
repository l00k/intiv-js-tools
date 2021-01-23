"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateException = exports.Validate = exports.Assert = void 0;
require("reflect-metadata");
const Utility_1 = require("../Utility");
const Validator_1 = __importDefault(require("./Validator"));
const ValidateException_1 = __importDefault(require("./Exception/ValidateException"));
exports.ValidateException = ValidateException_1.default;
function Assert(rules = {}, validateType = true) {
    return (target, property) => {
        const type = validateType
            ? Reflect.getMetadata('design:type', target, property)
            : null;
        Validator_1.default.registerPropertyValidation(target, property, type, rules);
    };
}
exports.Assert = Assert;
function Validate() {
    return (target, method, descriptor) => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
        const retType = Reflect.getMetadata('design:returntype', target, method);
        let originalMethod = descriptor.value;
        descriptor.value = function (...params) {
            let errors;
            errors = Validator_1.default.validateObject(this);
            if (!Utility_1.empty(() => errors)) {
                throw new ValidateException_1.default('Object validation using specified rules failed', 1573161073626, errors);
            }
            return originalMethod.apply(this, params);
        };
    };
}
exports.Validate = Validate;
