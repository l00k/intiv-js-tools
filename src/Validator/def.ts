const ValidatorRulesSymbol = Symbol('ValidatorRules');

type FieldValidationErrors = {
    rule : string,
    options? : any[],
}[];

type ValidationErrors = {
    [field : string] : FieldValidationErrors
};

type ValidationRules = {
    [ruleName : number] : object
};

type PropertyValidationRules = {
    [property : string] : {
        validateType : any,
        rules : ValidationRules
    }
};

type MethodValidationRules = {
    [parameterIdx : number] : {
        isComplex : boolean,
        rules : ValidationRules
    }
};

type ObjectValidatonRules = {
    methods : {
        [method : string] : MethodValidationRules
    },
    properties : {
        [property : string] : ValidationRules
    }
};

export {
    ValidatorRulesSymbol,
    FieldValidationErrors,
    ValidationErrors,
    ValidationRules,
    PropertyValidationRules,
    MethodValidationRules,
    ObjectValidatonRules,
};
