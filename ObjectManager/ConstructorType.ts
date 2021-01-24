import { SingletonSymbol } from './def';


export default interface ConstructorType<T> extends Function
{
    new(...args : any[]) : T;

    [SingletonSymbol]? : boolean;
}
