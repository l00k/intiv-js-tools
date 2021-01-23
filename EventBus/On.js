"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectManager_1 = require("../ObjectManager");
const EventBus_1 = __importDefault(require("./EventBus"));
function On(eventName) {
    return (target, method, descriptor) => {
        let eventBus = ObjectManager_1.ObjectManager.getInstance(EventBus_1.default);
        eventBus.on(eventName, target, method);
    };
}
exports.default = On;
