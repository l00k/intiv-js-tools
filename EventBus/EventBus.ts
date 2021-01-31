import { isEmpty } from 'lodash-es';
import { ObjectManager, Singleton } from '../ObjectManager';
import Observer from './Observer';


type Callback = (data : any, previousResult : any) => any;

type Listners = {
    [eventName : string] : Callback[]
};


@Singleton()
class EventBus
{

    protected observers : Map<typeof Observer, Observer> = new Map();

    protected listeners : Listners = {};

    public on(eventName : string, observerClass : typeof Observer, method : string)
    {
        if (isEmpty(this.listeners[eventName])) {
            this.listeners[eventName] = [];
        }

        let observer = this.observers.get(observerClass);
        if (!observer) {
            observer = ObjectManager.getInstance(<any> observerClass.constructor);
            this.observers.set(observerClass, observer);
        }

        this.listeners[eventName].push(observer[method].bind(observer));
    }

    public async handle(eventName : string, data : any)
    {
        if (isEmpty(this.listeners[eventName])) {
            return null;
        }

        let previousResult = null;
        for (let idx in this.listeners[eventName]) {
            const callback = this.listeners[eventName][idx];
            previousResult = await callback(data, previousResult);
        }

        return previousResult;
    }

}


export default EventBus;
