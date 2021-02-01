import { Initializable } from '../Initializable';
import { ValidationError } from './def';


type PropertyErrorMap = {
    [property : string] : ValidationError[]
}

type SubObjectsErrorMap = {
    [subObject : string] : ValidationResult
}

type ParameterErrorMap = {
    [parameterIdx : number] : ValidationError[]
}


class ValidationResult
{

    public valid : boolean = true;

    public properties : PropertyErrorMap = {};

    public subObjects : SubObjectsErrorMap = {};

    public parameters : ParameterErrorMap = {};

    public returnType : boolean = true;

}

export default class extends Initializable(ValidationResult) {};
