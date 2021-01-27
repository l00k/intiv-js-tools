import PropertyDescriptor from './PropertyDescriptor';


export type Properties = { [index : string] : PropertyDescriptor };

export type Mapping = {
    [property : string] : string
};
