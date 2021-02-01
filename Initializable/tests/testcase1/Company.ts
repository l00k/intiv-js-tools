import { Initializable } from '../../../Initializable';


class Company
{

    public name : string;

    public active : boolean;

}


export default class extends Initializable(Company) {};
