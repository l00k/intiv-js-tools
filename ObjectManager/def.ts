export const SingletonSymbol = Symbol('Singleton');

export type ClassConstructor<T> = {
    new(...args : any[]) : T,
    [index : string] : any,
};


export class InjectionDescription
{

    public constructor(
        public type : ClassConstructor<any>,
        public name? : string,
        public ctorArgs? : any[],
    )
    {
    }
}
