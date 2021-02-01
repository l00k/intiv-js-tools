"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = require("./def");
function InitializationMapping(mapping) {
    return function (Target) {
        Target[def_1.MappingSymbol] = mapping;
    };
}
exports.default = InitializationMapping;
