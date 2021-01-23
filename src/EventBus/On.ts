import { ObjectManager } from '../ObjectManager';
import EventBus from './EventBus';

function On(eventName : string)
{
    return (target : any, method : string, descriptor : any) => {
        let eventBus = <EventBus> ObjectManager.getInstance(EventBus);
        eventBus.on(eventName, target, method);
    };
}


export default On;
