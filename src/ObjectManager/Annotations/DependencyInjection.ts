import 'reflect-metadata';
import ObjectManager from '../ObjectManager';


interface ConstructorType extends Function
{
    new(...args : any[]) : any;

    [name : string] : any
}


function DependencyInjection()
{
    return (Target : ConstructorType) => {
        const ExtClass = class extends Target
        {
            constructor(...ctorArgs : any[])
            {
                super(...ctorArgs);
                ObjectManager.loadDependencies(this, Target, ctorArgs);
            }
        };
        Object.defineProperty(ExtClass, 'name', { value: Target.name });
        return <any> ExtClass;
    };
}

export default DependencyInjection;

