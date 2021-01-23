import ValidateJsExt from 'validate.js';


type PropertyValidationErrors = {
    rule : string,
    options? : any[],
}[];

type MethodValidationErrors = {
    [field : string] : PropertyValidationErrors
};


ValidateJsExt.formatters.intiv = function(errors : any[]) {
    let result : MethodValidationErrors = {};
    errors.map((error) => {
        if (!result[error.attribute]) {
            result[error.attribute] = [];
        }

        result[error.attribute].push({
            rule: error.validator,
            options: error.options,
        });
    });
    return result;
};

ValidateJsExt.validators.type.types.numeric = function(value : any) {
    return value == Number(value);
};


export default ValidateJsExt;
