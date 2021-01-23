"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const def_1 = require("../def");
function ApplyMapping() {
    return (target, method, descriptor) => {
        const targetProto = target.constructor.prototype;
        const methodProto = targetProto[method];
        // collect default mapping
        const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
        if (!methodProto[def_1.MapSymbol]) {
            methodProto[def_1.MapSymbol] = {};
        }
        for (let parameterIdx in paramTypes) {
            const paramType = paramTypes[parameterIdx];
            if (!methodProto[def_1.MapSymbol][parameterIdx]) {
                methodProto[def_1.MapSymbol][parameterIdx] = {
                    targetClass: paramType,
                };
            }
        }
        // apply patch to method
        let originalMethod = descriptor.value;
        descriptor.value = async function (...params) {
            for (let parameterIdx in params) {
                if (!methodProto[def_1.MapSymbol][parameterIdx]
                    || !params[parameterIdx]) {
                    continue;
                }
                const paramMap = methodProto[def_1.MapSymbol][parameterIdx];
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
exports.default = ApplyMapping;
