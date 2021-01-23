"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = require("../Utility");
const ObjectManager_1 = require("../ObjectManager");
let EventBus = class EventBus {
    constructor() {
        this.observers = new Map();
        this.listeners = {};
    }
    on(eventName, observerClass, method) {
        if (Utility_1.empty(() => this.listeners[eventName])) {
            this.listeners[eventName] = [];
        }
        let observer = this.observers.get(observerClass);
        if (!observer) {
            observer = ObjectManager_1.ObjectManager.getInstance(observerClass.constructor);
            this.observers.set(observerClass, observer);
        }
        this.listeners[eventName].push(observer[method].bind(observer));
    }
    async handle(eventName, data) {
        if (Utility_1.empty(() => this.listeners[eventName])) {
            return null;
        }
        let previousResult = null;
        for (let idx in this.listeners[eventName]) {
            const callback = this.listeners[eventName][idx];
            previousResult = await callback(data, previousResult);
        }
        return previousResult;
    }
};
EventBus = __decorate([
    ObjectManager_1.Singleton()
], EventBus);
exports.default = EventBus;
