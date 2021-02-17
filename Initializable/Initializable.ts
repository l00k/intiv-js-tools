import { Mapping, Properties, PropertySymbol, MappingSymbol, ClassConstructor } from './def';
import PropertyDescriptor from './PropertyDescriptor';

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export default class Initializable<T>
{

    public constructor(data? : RecursivePartial<T>)
    {
    }

    public setData(data? : RecursivePartial<T>)
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
                                let subElm = this._setDataSubObject(propertyDsrp.arrayOf, elm);
                                this[property].push(subElm);
                            });
                        }
                        else if (typeof rawValue == 'object') {
                            Object.keys(rawValue).forEach((idx) => {
                                let subElm = this._setDataSubObject(propertyDsrp.arrayOf, rawValue[idx]);
                                this[property].push(subElm);
                            });
                        }
                    }
                    else {
                        this[property] = this._setDataSubObject(propertyDsrp.type, rawValue);
                    }
                }
            });
    }

    protected _setDataSubObject(type : ClassConstructor, rawValue : Object)
    {
        if (type.prototype instanceof Initializable) {
            const object : Initializable<any> = <any> new type();
            object.setData(rawValue);
            return object;
        }
        else {
            return new type(rawValue)
        }
    }
}
