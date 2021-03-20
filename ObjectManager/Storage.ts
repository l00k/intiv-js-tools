import { InjectionDescription } from './def';


type Services = {
    [name : string] : any
};

type ServicesByTag = {
    [tag : string] : string[]
};

type Injections = Map<Object, { [propertyName : string] : InjectionDescription }>;

export default class Storage
{

    public instances : Services = {};

    public servicesByTag : ServicesByTag = {};

    public injections : Injections = new Map();

}
