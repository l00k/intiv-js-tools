import { ObjectManager } from '../ObjectManager';
import EventBus from './EventBus';
import Observer from './Observer';


function On(eventName : string)
{
    return (Target : typeof Observer, method : string, descriptor : PropertyDescriptor) => {
        let eventBus = <EventBus> ObjectManager.getInstance(EventBus);
        eventBus.on(eventName, Target, method);
    };
}

export default On;
