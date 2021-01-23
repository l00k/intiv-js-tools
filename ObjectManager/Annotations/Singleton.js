"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const def_1 = require("../def");
function Singleton() {
    return (Target) => {
        Target[def_1.SingletonSymbol] = true;
    };
}
exports.default = Singleton;
