import { Mapping, Properties, PropertySymbol, MappingSymbol } from './def';
import PropertyDescriptor from './PropertyDescriptor';


export default class Initializable<T>
{

    public constructor(data? : Partial<T>)
    {
    }

    public setData(data? : Partial<T>)
    {
        if (!data) {
            return;
        }

        const Target = Object.getPrototypeOf(this);

        const mapping = Target[MappingSymbol] || {};
        const properties : Properties = Target[PropertySymbol] || {};

        Object.entries(data)
            .forEach(([fieldName, rawValue]) => {
                const property = mapping[fieldName]
                    ? mapping[fieldName]
                    : fieldName;

                let propertyDsrp = properties[property];
                if (!propertyDsrp) {
                    propertyDsrp = new PropertyDescriptor({ preserveRaw: true });
                }

                // population blocked
                if (!propertyDsrp.populate) {
                    return;
                }

                if (rawValue === null) {
                    this[property] = null;
                }
                else if (propertyDsrp.preserveRaw) {
                    this[property] = rawValue;
                }
                else if (propertyDsrp.isPrimitive) {
                    if (propertyDsrp.type === Boolean) {
                        this[property] = !!rawValue;
                    }
                    else if (propertyDsrp.type === Number) {
                        this[property] = +rawValue;
                    }
                    else {
                        this[property] = rawValue;
                    }
                }
                else {
                    if (propertyDsrp.isArray) {
                        this[property] = [];

                        if (rawValue instanceof Array) {
                            rawValue.forEach((elm) => {
                                let subElm = new propertyDsrp.arrayOf(elm);
                                this[property].push(subElm);
                            });
                        }
                        else if (typeof rawValue == 'object') {
                            Object.keys(rawValue).forEach((idx) => {
                                let subElm = new propertyDsrp.arrayOf(rawValue[idx]);
                                this[property].push(subElm);
                            });
                        }
                    }
                    else {
                        this[property] = new propertyDsrp.type(rawValue);
                    }
                }
            });
    }

}
