import { Mapping, MappingSymbol } from './def';


export type ConstructorType<T = {}> = new (...args : any[]) => T;

export default function InitializationMapping<T>(mapping : Mapping<T>) {
    return function(Target : ConstructorType) {
        Target[MappingSymbol] = mapping;
    };
}
