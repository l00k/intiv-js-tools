import { InjectionDescription, InjectableOptions } from '../def';
import ObjectManager from '../ObjectManager';


export default function Injectable(options? : InjectableOptions)
{
    return (Target : Object, propertyName : string) => {
        const Type = Reflect.getMetadata('design:type', Target, propertyName);

        const instance = ObjectManager.getInstance(Type);
        ObjectManager.registerInjectable(Type, options);
    };
}
