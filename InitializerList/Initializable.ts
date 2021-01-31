import { Mapping, Properties, PropertySymbol } from './def';
import PropertyDescriptor from './PropertyDescriptor';


export default class Initializable<T>
{

    public constructor(...args : any[])
    {
        if (args[0] instanceof Object) {
            this.setData(args[0]);
        }
    }

    public setData(data? : Partial<T>)
    {
        const me = <any> this;
        if (!data) {
            return;
        }

        const Target = Object.getPrototypeOf(this);

        const mapping : Mapping<T> = Target[PropertySymbol];
        const properties : Properties = Target[PropertySymbol];

        Object.entries(data)
            .forEach(([fieldName, rawValue]) => {
                const property = mapping[fieldName]
                    ? mapping[fieldName]
                    : fieldName;

                let propertyDsrp = properties[<any>property];
                if (!propertyDsrp) {
                    propertyDsrp = new PropertyDescriptor({ preserveRaw: true });
                }

                // population blocked
                if (!propertyDsrp.populate) {
                    return;
                }

                // null value case
                if (rawValue === null) {
                    me[property] = null;
                }
                // primitive values stay "simple"
                else if (propertyDsrp.isPrimitive) {
                    if (propertyDsrp.type === Boolean) {
                        me[property] = !!rawValue;
                    }
                    else if (propertyDsrp.type === Number) {
                        me[property] = +rawValue;
                    }
                    else {
                        me[property] = rawValue;
                    }
                }
                else {
                    // array case
                    if (propertyDsrp.isArray) {
                        // @ts-ignore
                        this[property] = [];

                        if (rawValue instanceof Array) {
                            rawValue.forEach((elm) => {
                                let subElm = new propertyDsrp.arrayOf(elm);
                                me[property].push(subElm);
                            });
                        }
                        else if (typeof rawValue == 'object') {
                            Object.keys(rawValue).forEach((idx) => {
                                let subElm = new propertyDsrp.arrayOf(rawValue[idx]);
                                me[property].push(subElm);
                            });
                        }
                    }
                    // mapping objects
                    else {
                        me[property] = new propertyDsrp.type(rawValue);
                    }
                }
            });
    }

}
