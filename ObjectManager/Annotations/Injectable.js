"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ObjectManager_1 = tslib_1.__importDefault(require("../ObjectManager"));
function Injectable(options) {
    return (Target, propertyName) => {
        const Type = Reflect.getMetadata('design:type', Target, propertyName);
        const instance = ObjectManager_1.default.getInstance(Type);
        ObjectManager_1.default.registerInjectable(Type, options);
    };
}
exports.default = Injectable;
