import { Mapping } from './def';


interface ConstructorType extends Function
{
    new(...args : any[]) : any;

    [name : string] : any
}


function InitializerList(mapping : Mapping = {})
{
    return (Target : any) => {
        const ExtClass = class extends Target
        {
            constructor(...args : any[])
            {
                super(...args);

                if (args[0] instanceof Object) {
                    this.setData(args[0], mapping);
                }
            }
        };

        // copy static variables
        Object.assign(ExtClass, Target);

        // assign name
        Object.defineProperty(ExtClass, 'name', { value: Target.name });

        return <typeof Target> ExtClass;
    };
}

export default InitializerList;
