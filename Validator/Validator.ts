import { ValidatorRulesSymbol, MethodValidationRules, PropertyValidationRules, ValidationErrors } from './def';
import { Exception } from '../Exception';
import { empty, isObject } from '../Utility';

import ValidateJsExt from './ValidateJsExt';


class Validator
{

    /*
     * Registration methods
     */
    public static registerMethodValidation(target : any, method : string, parameterIdx : number, isComplex : boolean, rules : {})
    {
        let targetProto = target.constructor.prototype;

        if (!targetProto[ValidatorRulesSymbol]) {
            targetProto[ValidatorRulesSymbol] = {
                methods: {},
                properties: {},
            };
        }

        if (!targetProto[ValidatorRulesSymbol].methods[method]) {
            targetProto[ValidatorRulesSymbol].methods[method] = {};
        }

        if (!targetProto[ValidatorRulesSymbol].methods[method][parameterIdx]) {
            targetProto[ValidatorRulesSymbol].methods[method][parameterIdx] = { isComplex: false, rules: {} };
        }

        targetProto[ValidatorRulesSymbol].methods[method][parameterIdx].isComplex = isComplex;

        Object.assign(targetProto[ValidatorRulesSymbol].methods[method][parameterIdx].rules, rules);
    }

    public static registerPropertyValidation(target : any, property : string, validateType : any, rules : {})
    {
        let targetProto = target.constructor.prototype;

        if (!targetProto[ValidatorRulesSymbol]) {
            targetProto[ValidatorRulesSymbol] = {
                methods: {},
                properties: {},
            };
        }

        if (!targetProto[ValidatorRulesSymbol].properties[property]) {
            targetProto[ValidatorRulesSymbol].properties[property] = {
                validateType: null,
                rules: {},
            };
        }

        targetProto[ValidatorRulesSymbol].properties[property].validateType = validateType;

        Object.assign(targetProto[ValidatorRulesSymbol].properties[property].rules, rules);
    }

    /*
     * Validation methods
     */
    public static validateParamTypes(parameters : any[], paramTypes : any[]) : ValidationErrors
    {
        let errors : ValidationErrors = {};

        for (const parameterIdx in paramTypes) {
            if (
                !!paramTypes[parameterIdx]
                && !this.validateType(parameters[parameterIdx], paramTypes[parameterIdx])
            ) {
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

    public static validateReturnType(returnValue : any, returnType : any) : ValidationErrors
    {
        let errors : ValidationErrors = {};

        if (
            !!returnType
            && !this.validateType(returnValue, returnType)
        ) {
            errors.__return = [
                { rule: 'd:returnType' }
            ];
        }

        return errors;
    }

    public static validateObject(target : any) : ValidationErrors
    {
        const targetProto = target.constructor.prototype;

        let errors : ValidationErrors = {};

        if (empty(() => targetProto[ValidatorRulesSymbol].properties)) {
            return errors;
        }

        const validatorRules : PropertyValidationRules = targetProto[ValidatorRulesSymbol].properties;
        for (const property in validatorRules) {
            const propertyRules = validatorRules[property];

            if (
                propertyRules.validateType
                && !this.validateType(target[property], propertyRules.validateType)
            ) {
                if (!errors[property]) {
                    errors[property] = [];
                }

                errors[property].push({
                    rule: 'd:type'
                });
            }

            if (!empty(() => propertyRules.rules)) {
                let ValidateJsExtResult = ValidateJsExt({ field: target[property] }, { field: propertyRules.rules }, { format: 'intiv' });
                if (!empty(() => ValidateJsExtResult)) {
                    errors[property] = ValidateJsExtResult.field;
                }
            }
        }

        return errors;
    }

    public static validateMethod(target : any, method : string, parameters : any[]) : ValidationErrors
    {
        const targetProto = target.constructor.prototype;

        let errors : ValidationErrors = {};

        // object validation
        for (const parameterIdx in parameters) {
            const value = parameters[parameterIdx];

            if (!isObject(value)) {
                continue;
            }

            let validateObjectResult = this.validateObject(value);
            if (!empty(() => validateObjectResult)) {
                for (let property in validateObjectResult) {
                    errors['param:' + parameterIdx + ':' + property] = validateObjectResult[property];
                }
            }
        }

        if (empty(() => targetProto[ValidatorRulesSymbol].methods[method])) {
            return errors;
        }

        // specific rules
        const validatorRules : MethodValidationRules = targetProto[ValidatorRulesSymbol].methods[method];
        for (const parameterIdx in validatorRules) {
            const isComplex = validatorRules[parameterIdx].isComplex;
            const parameterRules = validatorRules[parameterIdx].rules;
            const value = parameters[parameterIdx];

            let validateParameterResult = isComplex
                ? ValidateJsExt(value, parameterRules, { format: 'intiv' })
                : ValidateJsExt({ field: value }, { field: parameterRules }, { format: 'intiv' });

            if (!empty(() => validateParameterResult)) {
                errors['param:' + parameterIdx] = isComplex
                    ? validateParameterResult
                    : validateParameterResult.field;
            }
        }

        return errors;
    }


    protected static validateType(value : any, type : any)
    {
        if (!type) {
            throw new Exception('Type has to be defined', 1573658489606);
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


export default Validator;
