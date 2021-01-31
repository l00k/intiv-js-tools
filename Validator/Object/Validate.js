"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationException_1 = __importDefault(require("../ValidationException"));
const Validator_1 = __importDefault(require("../Validator"));
function Validate() {
    return (Target, method, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...params) {
            let errors;
            const result = Validator_1.default.validateObject(this);
            if (!result.valid) {
                throw new ValidationException_1.default('Object validation using specified rules failed', 1573161073626, errors);
            }
            return originalMethod.apply(this, params);
        };
    };
}
exports.default = Validate;
