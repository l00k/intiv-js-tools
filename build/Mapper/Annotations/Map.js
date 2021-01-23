"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const def_1 = require("../def");
const MappingException_1 = __importDefault(require("../Exception/MappingException"));
function mapObject(plainValue, mapOptions) {
    try {
        return plainValue instanceof mapOptions.targetClass
            ? plainValue
            : class_transformer_1.plainToClass(mapOptions.targetClass, plainValue);
    }
    catch (exception) {
        throw new MappingException_1.default(exception);
    }
}
function Map(options) {
    return (target, method, parameterIdx) => {
        const targetProto = target.constructor.prototype;
        const methodProto = targetProto[method];
        if (!methodProto[def_1.MapSymbol]) {
            methodProto[def_1.MapSymbol] = {};
        }
        if (!options) {
            options = {};
        }
        options.mappingFunction = mapObject;
        if (!options.targetClass) {
            const paramTypes = Reflect.getMetadata('design:paramtypes', target, method);
            options.targetClass = paramTypes[parameterIdx];
        }
        methodProto[def_1.MapSymbol][parameterIdx] = options;
    };
}
exports.default = Map;
