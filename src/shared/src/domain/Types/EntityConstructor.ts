import { Entity } from '../Entity';

export type EntityConstructor<T extends Entity> = new (...args: any[]) => T;
