"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Release = void 0;
const def_1 = require("./def");
exports.Release = Symbol('Release');
class ObjectManager {
    static getInstance(Klass, ...args) {
        if (Klass[def_1.SingletonSymbol]) {
            if (!this.instances[Klass.name]) {
                this.instances[Klass.name] = this.createInstance(Klass, ...args);
            }
            return this.instances[Klass.name];
        }
        return this.createInstance(Klass, ...args);
    }
    static bindInstance(object) {
        if (this.instances[object.name]) {
            throw new Error(`Instance typed as ${object.name} already has been bonded`);
        }
        this.instances[object.name] = object;
    }
    static getService(name) {
        if (!this.instances[name]) {
            throw new Error(`Instance named as ${name} hasn't been bonded yet`);
        }
        return this.instances[name];
    }
    static bindService(service, name) {
        if (this.instances[name]) {
            throw new Error(`Instance named as ${name} already has been bonded`);
        }
        this.instances[name] = service;
    }
    static createInstance(Klass, ...args) {
        let object = new Klass(...args);
        return this.loadDependencies(object, args);
    }
    static loadDependencies(object, ...args) {
        if (object[def_1.InjectSymbol]) {
            for (const propertyName in object[def_1.InjectSymbol]) {
                const injection = object[def_1.InjectSymbol][propertyName];
                if (injection.name) {
                    object[propertyName] = this.getService(injection.name);
                }
                else {
                    object[propertyName] = this.getInstance(injection.type, ...injection.args);
                }
            }
        }
        return object;
    }
    static releaseAll() {
        for (const instanceName in this.instances) {
            const instance = this.instances[instanceName];
            if (instance[exports.Release]) {
                instance[exports.Release]();
            }
        }
    }
}
exports.default = ObjectManager;
ObjectManager.instances = {};
