import ConstructorType from './ConstructorType';


const SingletonSymbol = Symbol('Singleton');


class InjectionDescription
{

    public constructor(
        public type : ConstructorType<any>,
        public name? : string,
        public ctorArgs? : any[],
    )
    {
    }

}


export {
    SingletonSymbol,
    InjectionDescription,
};
