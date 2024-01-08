import { CompositeSpecification } from './CompositeSpecification';

export abstract class AbstractSpecification<T> implements CompositeSpecification<T> {
  public abstract isSatisfiedBy(candidate: T): boolean;

  public and(other: CompositeSpecification<T>): CompositeSpecification<T> {
    return new AndSpecification(this, other);
  }

  public not(): CompositeSpecification<T> {
    return new NotSpecification(this);
  }

  public or(other: CompositeSpecification<T>): CompositeSpecification<T> {
    return new OrSpecification(this, other);
  }
}

class AndSpecification<T> extends AbstractSpecification<T> {
  private one: CompositeSpecification<T>;
  private other: CompositeSpecification<T>;

  public constructor(one: CompositeSpecification<T>, other: CompositeSpecification<T>) {
    super();
    this.one = one;
    this.other = other;
  }

  public isSatisfiedBy(candidate: T) {
    return this.one.isSatisfiedBy(candidate) && this.other.isSatisfiedBy(candidate);
  }
}

class OrSpecification<T> extends AbstractSpecification<T> {
  private one: CompositeSpecification<T>;
  private other: CompositeSpecification<T>;

  public constructor(one: CompositeSpecification<T>, other: CompositeSpecification<T>) {
    super();
    this.one = one;
    this.other = other;
  }

  public isSatisfiedBy(candidate: T) {
    return this.one.isSatisfiedBy(candidate) || this.other.isSatisfiedBy(candidate);
  }
}

class NotSpecification<T> extends AbstractSpecification<T> {
  private wrapped: CompositeSpecification<T>;

  public constructor(wrapped: CompositeSpecification<T>) {
    super();
    this.wrapped = wrapped;
  }

  public isSatisfiedBy(candidate: T) {
    return !this.wrapped.isSatisfiedBy(candidate);
  }
}
