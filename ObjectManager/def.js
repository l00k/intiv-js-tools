"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionDescription = exports.SingletonSymbol = void 0;
const SingletonSymbol = Symbol('Singleton');
exports.SingletonSymbol = SingletonSymbol;
class InjectionDescription {
    constructor(type, name, ctorArgs) {
        this.type = type;
        this.name = name;
        this.ctorArgs = ctorArgs;
    }
}
exports.InjectionDescription = InjectionDescription;
