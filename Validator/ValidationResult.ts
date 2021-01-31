import { Initializable } from '../InitializerList';
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


export default class ValidationResult
    extends Initializable<ValidationResult>
{

    public valid : boolean = true;

    public properties : PropertyErrorMap = {};

    public subObjects : SubObjectsErrorMap = {};

    public parameters : ParameterErrorMap = {};

    public returnType : boolean = true;

}
