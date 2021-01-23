"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const def_1 = require("../def");
function Inject(name = null, args = []) {
    return (Target, propertyName) => {
        // property annotation
        if (!Target[def_1.InjectSymbol]) {
            Target[def_1.InjectSymbol] = {};
        }
        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        Target[def_1.InjectSymbol][propertyName] = new def_1.InjectionDescription(Type, name, args);
    };
}
exports.default = Inject;
