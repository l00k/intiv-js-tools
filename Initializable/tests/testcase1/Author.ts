import { Property, Initializable, Initialize } from '../../../Initializable';
import Company from './Company';


@Initialize()
export default class Author
    extends Initializable<Author>
{

    public name : string = 'initial';

    public active : boolean = false;

    @Property()
    public company : Company;

}
