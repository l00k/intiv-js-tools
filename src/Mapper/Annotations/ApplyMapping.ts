import 'reflect-metadata';

import { MapOptions, MapSymbol } from '../def';


function ApplyMapping()
{
    return (target : any, method : string, descriptor : any) => {
        const targetProto = target.constructor.prototype;
        const methodProto = targetProto[method];

        // collect default mapping
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);

        if (!methodProto[MapSymbol]) {
            methodProto[MapSymbol] = {};
        }

        for (let parameterIdx in paramTypes) {
            const paramType = paramTypes[parameterIdx];

            if (!methodProto[MapSymbol][parameterIdx]) {
                methodProto[MapSymbol][parameterIdx] = {
                    targetClass: paramType,
                };
            }
        }

        // apply patch to method
        let originalMethod = descriptor.value;

        descriptor.value = async function(...params : any[]) {
            for (let parameterIdx in params) {
                if (
                    !methodProto[MapSymbol][parameterIdx]
                    || !params[parameterIdx]
                ) {
                    continue;
                }

                const paramMap : MapOptions = methodProto[MapSymbol][parameterIdx];

                // resolve getter
                let plainValue = !!paramMap.getterCallee
                    ? await paramMap.getterCallee.call(this, ...params)
                    : params[parameterIdx];

                params[parameterIdx] = paramMap.mappingFunction(plainValue, paramMap);
            }

            return await originalMethod.apply(this, params);
        };
    };
}

export default ApplyMapping;
