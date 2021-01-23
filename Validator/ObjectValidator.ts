import 'reflect-metadata';

import { empty } from '../Utility';

import { ValidationErrors, ValidationRules, PropertyValidationRules, MethodValidationRules, ObjectValidatonRules } from './def';
import Validator from './Validator';
import ValidateException from './Exception/ValidateException';


function Assert(rules : {} = {}, validateType : boolean = true)
{
    return (target : any, property : string) => {
        const type = validateType
            ? Reflect.getMetadata('design:type', target, property)
            : null;

        Validator.registerPropertyValidation(target, property, type, rules);
    };
}

function Validate()
{
    return (target : any, method : string, descriptor : any) => {
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
        const retType = Reflect.getMetadata('design:returntype', target, method);

        let originalMethod = descriptor.value;

        descriptor.value = function(...params : any[]) {
            let errors : ValidationErrors;

            errors = Validator.validateObject(this);
            if (!empty(() => errors)) {
                throw new ValidateException('Object validation using specified rules failed', 1573161073626, errors);
            }

            return originalMethod.apply(this, params);
        };
    };
}


export {
    Assert,
    Validate,
    ValidateException,
};
