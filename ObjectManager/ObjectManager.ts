import { InjectionDescription, SingletonSymbol, ClassConstructor } from './def';
import Storage from './Storage';


export const ObjectManagerSymbol = Symbol('ObjectManager');

// service release symbol
export const ReleaseSymbol = Symbol('Release');

declare const window;
declare const global;

export default class ObjectManager
{

    /**
     * Global storage
     */
    public static get storage() : Storage
    {
        const globalScope = global !== undefined
            ? global
            : window;

        if (!globalScope[ObjectManagerSymbol]) {
            globalScope[ObjectManagerSymbol] = new Storage();
        }

        return globalScope[ObjectManagerSymbol];
    }

    public static getInstance<T>(
        Klass : ClassConstructor<T>,
        ctorArgs : any[] = []
    ) : T
    {
        if ((<any>Klass)[SingletonSymbol]) {
            if (!this.storage.instances[Klass.name]) {
                this.storage.instances[Klass.name] = this.createInstance(Klass, ctorArgs);
            }

            return this.storage.instances[Klass.name];
        }

        return this.createInstance(Klass, ctorArgs);
    }

    public static bindInstance(object : any) : void
    {
        if (this.storage.instances[object.name]) {
            throw new Error(`Instance typed as ${object.name} already has been bonded`);
        }

        this.storage.instances[object.name] = object;
    }

    public static getService<T>(name : string) : T
    {
        if (!this.storage.instances[name]) {
            throw new Error(`Instance named as ${name} hasn't been bonded yet`);
        }

        return this.storage.instances[name];
    }

    public static bindService(service : any, name : string) : void
    {
        if (this.storage.instances[name]) {
            throw new Error(`Instance named as ${name} already has been bonded`);
        }

        this.storage.instances[name] = service;
    }

    protected static createInstance<T>(
        Klass : any,
        ctorArgs : any[] = []
    ) : T
    {
        const object = new Klass(...ctorArgs);
        this.loadDependencies(object, Klass.prototype);

        return object;
    }

    public static registerInjection(
        Target : Object,
        propertyName : string,
        injectionDescription : InjectionDescription
    )
    {
        let targetInjections = this.storage.injections.get(Target);
        if (!targetInjections) {
            targetInjections = {};
            this.storage.injections.set(Target, targetInjections);
        }

        targetInjections[propertyName] = injectionDescription;
    }

    public static loadDependencies<T>(
        object : T,
        Type : ClassConstructor<T>
    )
    {
        let targetInjections = {};
        do {
            targetInjections = {
                ...targetInjections,
                ...this.storage.injections.get(Type)
            };

            Type = Object.getPrototypeOf(Type);
        }
        while(Type !== Object.prototype)

        if (!targetInjections) {
            return;
        }

        for (const propertyName in targetInjections) {
            const injection = targetInjections[propertyName];

            if (injection.name) {
                object[propertyName] = this.getService(injection.name);
            }
            else {
                object[propertyName] = this.getInstance(injection.type, injection.ctorArgs);
            }
        }
    }

    public static releaseAll()
    {
        for (const instanceName in this.storage.instances) {
            const instance = this.storage.instances[instanceName];
            if (instance[ReleaseSymbol]) {
                instance[ReleaseSymbol]();
            }
        }
    }

}
