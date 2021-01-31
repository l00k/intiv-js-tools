export const MapSymbol = Symbol('Mapping');

export type Constructor<T> = new (...args : any[]) => T;

export type MapOptions = {
    targetClass? : Constructor<any>,
    getterCallee? : Function,
    mappingFunction? : Function,
    config? : {
        [name : string] : any
    }
};
