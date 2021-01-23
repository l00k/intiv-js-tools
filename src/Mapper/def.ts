const MapSymbol = Symbol('Mapping');

type ConstructorType = {
    new(...args : any[]) : any
};

type MapOptions = {
    targetClass? : ConstructorType,
    getterCallee? : Function,
    mappingFunction? : Function,
    config? : {
        [name: string]: any
    }
};


export {
    MapSymbol,
    MapOptions,
};
