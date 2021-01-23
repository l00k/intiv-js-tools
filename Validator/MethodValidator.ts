import 'reflect-metadata';

import { empty } from '../Utility';

import { ValidationErrors, ValidationRules, PropertyValidationRules, MethodValidationRules, ObjectValidatonRules } from './def';
import Validator from './Validator';
import ValidateException from './Exception/ValidateException';


function Assert(rules : {}, isComplex : boolean = false)
{
    return (target : any, method : string, parameterIdx : number) => {
        Validator.registerMethodValidation(target, method, parameterIdx, isComplex, rules);
    };
}

function Validate(validateParamTypes : boolean = true, validateReturnType : boolean = false)
{
    return (target : any, method : string, descriptor : any) => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
        const retType = Reflect.getMetadata('design:returntype', target, method);

        let originalMethod = descriptor.value;

        descriptor.value = function(...params : any[]) {
            let errors : ValidationErrors;

            if (validateParamTypes) {
                errors = Validator.validateParamTypes(params, paramTypes);
                if (!empty(() => errors)) {
                    throw new ValidateException('Parameter types validation failed', 1572984957365, errors);
                }
            }

            errors = Validator.validateMethod(target, method, params);
            if (!empty(() => errors)) {
                throw new ValidateException('Parameter validation using specified rules failed', 1572985034861, errors);
            }

            let returnValue = originalMethod.apply(this, params);

            if (validateReturnType) {
                errors = Validator.validateReturnType(returnValue, retType);
                if (!empty(() => errors)) {
                    throw new ValidateException('Return value type validation failed', 1572985055963, errors);
                }
            }

            return returnValue;
        };
    };
}

export {
    Assert,
    Validate,
    ValidateException,
};
