export type ClassConstructor<T> = {
    new(...args : any[]) : T,
    [index : string] : any,
};

export type InjectableOptions = {

    instantiate : boolean,
    name? : string,
    tags? : string[],

};

export type InjectOptions = {
    tag? : string,
};


export class InjectionDescription
{

    public constructor(
        public type : ClassConstructor<any>,
        public name? : string,
        public options? : InjectOptions,
    )
    {}

}
