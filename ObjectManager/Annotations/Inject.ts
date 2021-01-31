import { InjectionDescription } from '../def';
import ObjectManager from '../ObjectManager';


export type ConstructorType<T> = new (...args : any[]) => T;

function Inject<T>(name : string = null, args : any[] = [])
{
    return (Target : ConstructorType<T>, propertyName : string) => {
        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        const description = new InjectionDescription(Type, name, args);

        ObjectManager.registerInjection(Target, propertyName, description);
    };
}

export default Inject;

