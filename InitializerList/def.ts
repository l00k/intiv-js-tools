import PropertyDescriptor from './PropertyDescriptor';


export const PropertySymbol = Symbol('Property');

export const MappingSymbol = Symbol('Mapping');

export type Properties = {
    [property : string] : PropertyDescriptor
};

export type Mapping<T> = {
    [input : string] : keyof T
};
