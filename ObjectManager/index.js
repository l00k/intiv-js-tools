"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = exports.DependencyInjection = exports.Inject = exports.ServiceWrapper = exports.Release = exports.ObjectManager = void 0;
const ObjectManager_1 = __importStar(require("./ObjectManager"));
exports.ObjectManager = ObjectManager_1.default;
Object.defineProperty(exports, "Release", { enumerable: true, get: function () { return ObjectManager_1.Release; } });
const ServiceWrapper_1 = __importDefault(require("./ServiceWrapper"));
exports.ServiceWrapper = ServiceWrapper_1.default;
const Inject_1 = __importDefault(require("./Annotations/Inject"));
exports.Inject = Inject_1.default;
const DependencyInjection_1 = __importDefault(require("./Annotations/DependencyInjection"));
exports.DependencyInjection = DependencyInjection_1.default;
const Singleton_1 = __importDefault(require("./Annotations/Singleton"));
exports.Singleton = Singleton_1.default;
