import { Exception, ExceptionMetadata } from '../../Exception';
import { ValidationErrors } from '../def';


class ValidateException
    extends Exception
{

    public name : string = 'ValidateException';

    public metadata : ExceptionMetadata = {
        responseCode: 422 // unprocessable entity
    };

    public details : ValidationErrors = {};

    constructor(message : string, code ? : number, details ? : ValidationErrors)
    {
        super(message, code);
        this.details = details || this.details;
    }

}


export default ValidateException;
