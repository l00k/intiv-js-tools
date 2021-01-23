import 'reflect-metadata';
import { plainToClass } from 'class-transformer';

import { MapOptions, MapSymbol } from '../def';
import MappingException from '../Exception/MappingException';


function mapObject(plainValue : any, mapOptions : MapOptions)
{
    try {
        return plainValue instanceof mapOptions.targetClass
            ? plainValue
            : plainToClass(mapOptions.targetClass, plainValue);
    }
    catch (exception) {
        throw new MappingException(exception);
    }
}

function Map(options? : MapOptions)
{
    return (target : any, method : string, parameterIdx : number) => {
        const targetProto = target.constructor.prototype;
        const methodProto = targetProto[method];

        if (!methodProto[MapSymbol]) {
            methodProto[MapSymbol] = {};
        }

        if (!options) {
            options = {};
        }

        options.mappingFunction = mapObject;

        if (!options.targetClass) {
            const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
            options.targetClass = paramTypes[parameterIdx];
        }

        methodProto[MapSymbol][parameterIdx] = options;
    };
}

export default Map;
