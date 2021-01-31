import { Mapping, MappingSymbol } from './def';


export type ClassConstructor<T = {}> = new (...args : any[]) => T;

export default function InitializationMapping<T>(mapping : Mapping<T>) {
    return function(Target : ClassConstructor) {
        Target[MappingSymbol] = mapping;
    };
}
