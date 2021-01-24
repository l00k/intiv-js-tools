import ConstructorType from './ConstructorType';
import { InjectionDescription } from './def';


type Services = {
    [name : string] : any
};

type Injections = Map<
    ConstructorType<any>,
    { [propertyName : string] : InjectionDescription }
>;

export default class Storage
{

    public instances : Services = {};

    public injections : Injections = new Map();

}
