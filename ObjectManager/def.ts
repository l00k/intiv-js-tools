export type ClassConstructor<T> = {
    new(...args : any[]) : T,
    [index : string] : any,
};

export type InjectableOptions = {
    tag? : string,
    key? : string,
};

export type InjectOptions = {
    name? : string,
    tag? : string,
};


export class InjectionDescription
{

    public constructor(
        public type : ClassConstructor<any>,
        public options? : InjectOptions,
    )
    {}

}
