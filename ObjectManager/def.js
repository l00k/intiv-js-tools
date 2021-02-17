"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectionDescription = void 0;
class InjectionDescription {
    constructor(type, name, ctorArgs) {
        this.type = type;
        this.name = name;
        this.ctorArgs = ctorArgs;
    }
}
exports.InjectionDescription = InjectionDescription;
