"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const ObjectManager_1 = require("../ObjectManager");
let EventBus = class EventBus {
    constructor() {
        this.observers = new Map();
        this.listeners = {};
    }
    on(eventName, callee, observerClass) {
        if (lodash_1.isEmpty(this.listeners[eventName])) {
            this.listeners[eventName] = [];
        }
        if (observerClass) {
            let observer = this.observers.get(observerClass);
            if (!observer) {
                observer = ObjectManager_1.ObjectManager.getInstance(observerClass.constructor);
                this.observers.set(observerClass, observer);
            }
            callee.bind(observer);
        }
        this.listeners[eventName].push(callee);
    }
    async emit(eventName, data) {
        if (lodash_1.isEmpty(this.listeners[eventName])) {
            return null;
        }
        for (let idx in this.listeners[eventName]) {
            const callback = this.listeners[eventName][idx];
            await callback(data);
        }
    }
};
EventBus = tslib_1.__decorate([
    ObjectManager_1.Singleton()
], EventBus);
exports.default = EventBus;
