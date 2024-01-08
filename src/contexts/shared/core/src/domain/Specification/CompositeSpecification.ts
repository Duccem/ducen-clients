import { Specification } from './Specification';

export interface CompositeSpecification<T> extends Specification<T> {
  and(other: CompositeSpecification<T>): CompositeSpecification<T>;
  or(other: CompositeSpecification<T>): CompositeSpecification<T>;
  not(): CompositeSpecification<T>;
}
