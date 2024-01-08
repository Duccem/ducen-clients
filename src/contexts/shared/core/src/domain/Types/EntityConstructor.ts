import { Entity } from '../Entity';
import { Primitives } from './Primitives';

export type EntityConstructor<T extends Entity> = new (payload: Primitives<T>) => T;
