"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = require("./def");
const Exception_1 = require("../Exception");
const Utility_1 = require("../Utility");
const ValidateJsExt_1 = __importDefault(require("./ValidateJsExt"));
class Validator {
    /*
     * Registration methods
     */
    static registerMethodValidation(target, method, parameterIdx, isComplex, rules) {
        let targetProto = target.constructor.prototype;
        if (!targetProto[def_1.ValidatorRulesSymbol]) {
            targetProto[def_1.ValidatorRulesSymbol] = {
                methods: {},
                properties: {},
            };
        }
        if (!targetProto[def_1.ValidatorRulesSymbol].methods[method]) {
            targetProto[def_1.ValidatorRulesSymbol].methods[method] = {};
        }
        if (!targetProto[def_1.ValidatorRulesSymbol].methods[method][parameterIdx]) {
            targetProto[def_1.ValidatorRulesSymbol].methods[method][parameterIdx] = { isComplex: false, rules: {} };
        }
        targetProto[def_1.ValidatorRulesSymbol].methods[method][parameterIdx].isComplex = isComplex;
        Object.assign(targetProto[def_1.ValidatorRulesSymbol].methods[method][parameterIdx].rules, rules);
    }
    static registerPropertyValidation(target, property, validateType, rules) {
        let targetProto = target.constructor.prototype;
        if (!targetProto[def_1.ValidatorRulesSymbol]) {
            targetProto[def_1.ValidatorRulesSymbol] = {
                methods: {},
                properties: {},
            };
        }
        if (!targetProto[def_1.ValidatorRulesSymbol].properties[property]) {
            targetProto[def_1.ValidatorRulesSymbol].properties[property] = {
                validateType: null,
                rules: {},
            };
        }
        targetProto[def_1.ValidatorRulesSymbol].properties[property].validateType = validateType;
        Object.assign(targetProto[def_1.ValidatorRulesSymbol].properties[property].rules, rules);
    }
    /*
     * Validation methods
     */
    static validateParamTypes(parameters, paramTypes) {
        let errors = {};
        for (const parameterIdx in paramTypes) {
            if (!!paramTypes[parameterIdx]
                && !this.validateType(parameters[parameterIdx], paramTypes[parameterIdx])) {
                if (!errors[parameterIdx]) {
                    errors['param:' + parameterIdx] = [];
                }
                errors['param:' + parameterIdx].push({
                    rule: 'd:paramType'
                });
            }
        }
        return errors;
    }
    static validateReturnType(returnValue, returnType) {
        let errors = {};
        if (!!returnType
            && !this.validateType(returnValue, returnType)) {
            errors.__return = [
                { rule: 'd:returnType' }
            ];
        }
        return errors;
    }
    static validateObject(target) {
        const targetProto = target.constructor.prototype;
        let errors = {};
        if (Utility_1.empty(() => targetProto[def_1.ValidatorRulesSymbol].properties)) {
            return errors;
        }
        const validatorRules = targetProto[def_1.ValidatorRulesSymbol].properties;
        for (const property in validatorRules) {
            const propertyRules = validatorRules[property];
            if (propertyRules.validateType
                && !this.validateType(target[property], propertyRules.validateType)) {
                if (!errors[property]) {
                    errors[property] = [];
                }
                errors[property].push({
                    rule: 'd:type'
                });
            }
            if (!Utility_1.empty(() => propertyRules.rules)) {
                let ValidateJsExtResult = ValidateJsExt_1.default({ field: target[property] }, { field: propertyRules.rules }, { format: 'intiv' });
                if (!Utility_1.empty(() => ValidateJsExtResult)) {
                    errors[property] = ValidateJsExtResult.field;
                }
            }
        }
        return errors;
    }
    static validateMethod(target, method, parameters) {
        const targetProto = target.constructor.prototype;
        let errors = {};
        // object validation
        for (const parameterIdx in parameters) {
            const value = parameters[parameterIdx];
            if (!Utility_1.isObject(value)) {
                continue;
            }
            let validateObjectResult = this.validateObject(value);
            if (!Utility_1.empty(() => validateObjectResult)) {
                for (let property in validateObjectResult) {
                    errors['param:' + parameterIdx + ':' + property] = validateObjectResult[property];
                }
            }
        }
        if (Utility_1.empty(() => targetProto[def_1.ValidatorRulesSymbol].methods[method])) {
            return errors;
        }
        // specific rules
        const validatorRules = targetProto[def_1.ValidatorRulesSymbol].methods[method];
        for (const parameterIdx in validatorRules) {
            const isComplex = validatorRules[parameterIdx].isComplex;
            const parameterRules = validatorRules[parameterIdx].rules;
            const value = parameters[parameterIdx];
            let validateParameterResult = isComplex
                ? ValidateJsExt_1.default(value, parameterRules, { format: 'intiv' })
                : ValidateJsExt_1.default({ field: value }, { field: parameterRules }, { format: 'intiv' });
            if (!Utility_1.empty(() => validateParameterResult)) {
                errors['param:' + parameterIdx] = isComplex
                    ? validateParameterResult
                    : validateParameterResult.field;
            }
        }
        return errors;
    }
    static validateType(value, type) {
        if (!type) {
            throw new Exception_1.Exception('Type has to be defined', 1573658489606);
        }
        // null and undefined is valid here
        if (!value) {
            return true;
        }
        const valueType = typeof value;
        if (valueType != 'object') {
            //  try to map value from plain
            if (valueType == 'boolean') {
                value = new Boolean(value);
            }
            else if (valueType == 'number') {
                value = new Number(value);
            }
            else if (valueType == 'string') {
                value = new String(value);
            }
        }
        return (value instanceof type.prototype.constructor);
    }
}
exports.default = Validator;
