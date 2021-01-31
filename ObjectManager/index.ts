import 'reflect-metadata';
import DependencyInjection from './Annotations/DependencyInjection';
import Inject from './Annotations/Inject';
import Singleton from './Annotations/Singleton';
import ObjectManager, { ReleaseSymbol } from './ObjectManager';
import ServiceWrapper from './ServiceWrapper';


export {
    ObjectManager,
    ReleaseSymbol,
    ServiceWrapper,
    Inject,
    DependencyInjection,
    Singleton
};
