import 'reflect-metadata';

import { InjectionDescription, InjectSymbol, SingletonSymbol } from '../def';
import ObjectManager from '../ObjectManager';


function Inject(name : string = null, args : any[] = [])
{
    return (Target : any, propertyName : string) => {
        // property annotation
        if (!Target[InjectSymbol]) {
            Target[InjectSymbol] = {};
        }

        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        Target[InjectSymbol][propertyName] = new InjectionDescription(Type, name, args);
    };
}

export default Inject;

