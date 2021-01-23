"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionDescription = exports.SingletonSymbol = exports.InjectSymbol = void 0;
const InjectSymbol = Symbol('Inject');
exports.InjectSymbol = InjectSymbol;
const SingletonSymbol = Symbol('Singleton');
exports.SingletonSymbol = SingletonSymbol;
class InjectionDescription {
    constructor(type, name, args) {
        this.type = type;
        this.name = name;
        this.args = args;
    }
}
exports.InjectionDescription = InjectionDescription;
