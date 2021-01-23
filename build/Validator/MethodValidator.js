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
function Assert(rules, isComplex = false) {
    return (target, method, parameterIdx) => {
        Validator_1.default.registerMethodValidation(target, method, parameterIdx, isComplex, rules);
    };
}
exports.Assert = Assert;
function Validate(validateParamTypes = true, validateReturnType = false) {
    return (target, method, descriptor) => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
        const retType = Reflect.getMetadata('design:returntype', target, method);
        let originalMethod = descriptor.value;
        descriptor.value = function (...params) {
            let errors;
            if (validateParamTypes) {
                errors = Validator_1.default.validateParamTypes(params, paramTypes);
                if (!Utility_1.empty(() => errors)) {
                    throw new ValidateException_1.default('Parameter types validation failed', 1572984957365, errors);
                }
            }
            errors = Validator_1.default.validateMethod(target, method, params);
            if (!Utility_1.empty(() => errors)) {
                throw new ValidateException_1.default('Parameter validation using specified rules failed', 1572985034861, errors);
            }
            let returnValue = originalMethod.apply(this, params);
            if (validateReturnType) {
                errors = Validator_1.default.validateReturnType(returnValue, retType);
                if (!Utility_1.empty(() => errors)) {
                    throw new ValidateException_1.default('Return value type validation failed', 1572985055963, errors);
                }
            }
            return returnValue;
        };
    };
}
exports.Validate = Validate;
