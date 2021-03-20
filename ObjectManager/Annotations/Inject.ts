import { InjectionDescription, ClassConstructor, InjectOptions } from '../def';
import ObjectManager from '../ObjectManager';


export default function Inject(name : string = null)
{
    return (Target : Object, propertyName : string) => {
        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        const description = new InjectionDescription(Type, name);

        ObjectManager.registerInjection(Target, propertyName, description);
    };
}

