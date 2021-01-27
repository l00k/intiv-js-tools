"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InitializerList(mapping = {}) {
    return (Target) => {
        const ExtClass = class extends Target {
            constructor(...args) {
                super(...args);
                if (args[0] instanceof Object) {
                    this.setData(args[0], mapping);
                }
            }
        };
        // copy static variables
        Object.assign(ExtClass, Target);
        // assign name
        Object.defineProperty(ExtClass, 'name', { value: Target.name });
        return ExtClass;
    };
}
exports.default = InitializerList;
