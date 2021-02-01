import { Initializable } from '../../../InitializerList';


class Company
{

    public name : string;

    public active : boolean;

}


export default class extends Initializable(Company) {};
