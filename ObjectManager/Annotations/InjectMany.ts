import { InjectionDescription, ClassConstructor, InjectOptions } from '../def';
import ObjectManager from '../ObjectManager';


export default function InjectMany(tag : string)
{
    return (Target : Object, propertyName : string) => {
        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        const description = new InjectionDescription(Type, undefined, { tag });

        ObjectManager.registerInjection(Target, propertyName, description);
    };
}

