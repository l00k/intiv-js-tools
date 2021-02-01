"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = exports.DependencyInjection = exports.Inject = exports.ServiceWrapper = exports.ReleaseSymbol = exports.ObjectManager = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const DependencyInjection_1 = tslib_1.__importDefault(require("./Annotations/DependencyInjection"));
exports.DependencyInjection = DependencyInjection_1.default;
const Inject_1 = tslib_1.__importDefault(require("./Annotations/Inject"));
exports.Inject = Inject_1.default;
const Singleton_1 = tslib_1.__importDefault(require("./Annotations/Singleton"));
exports.Singleton = Singleton_1.default;
const ObjectManager_1 = tslib_1.__importStar(require("./ObjectManager"));
exports.ObjectManager = ObjectManager_1.default;
Object.defineProperty(exports, "ReleaseSymbol", { enumerable: true, get: function () { return ObjectManager_1.ReleaseSymbol; } });
const ServiceWrapper_1 = tslib_1.__importDefault(require("./ServiceWrapper"));
exports.ServiceWrapper = ServiceWrapper_1.default;
