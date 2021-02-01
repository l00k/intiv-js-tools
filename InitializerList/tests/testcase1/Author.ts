import { Property, Initializable } from '../../../InitializerList';
import Company from './Company';


class Author
{

    public name : string = 'initial';

    public active : boolean = false;

    @Property()
    public company : Company;

}

export default Initializable(Author);
