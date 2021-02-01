import { Mapping, Properties, PropertySymbol } from './def';
import PropertyDescriptor from './PropertyDescriptor';


export type ClassConstructor<T = {}> = new (...args: any[]) => T;

export type InitializedClassConstructor<T> = new (data? : Partial<T>) => Partial<T> & {
    setData : (data? : Partial<T>) => void,
};

export default function Initializable<Base extends ClassConstructor>(Source : Base): InitializedClassConstructor<InstanceType<Base>>;
