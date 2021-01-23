"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const ObjectManager_1 = __importDefault(require("../ObjectManager"));
function DependencyInjection() {
    return (Target) => {
        const ExtClass = class extends Target {
            constructor(...ctorArgs) {
                super(...ctorArgs);
                ObjectManager_1.default.loadDependencies(this, Target, ctorArgs);
            }
        };
        Object.defineProperty(ExtClass, 'name', { value: Target.name });
        return ExtClass;
    };
}
exports.default = DependencyInjection;
