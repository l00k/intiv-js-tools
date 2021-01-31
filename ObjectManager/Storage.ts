import { InjectionDescription } from './def';


type Services = {
    [name : string] : any
};

type Injections = Map<Object, { [propertyName : string] : InjectionDescription }>;

export default class Storage
{

    public instances : Services = {};

    public injections : Injections = new Map();

}
