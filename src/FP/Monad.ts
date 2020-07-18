/**
 * @class
 * @description Monad函子
 */
export default class Monad {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
  public map(func: Function): Monad {
    const result = func(this.value);
    return Monad.of(result)
  }
  public join(): Monad {
    return this.flat(this);
  }
  private flat(functor: Monad): Monad {
    const { value } = functor;
    return value && value.constructor === Monad
      ? this.flat(value)
      : functor
  }
  public flatMap(f: Function) {
    //return this.map(f).join();
    return this.join().map(f);
  }
  static of(value: any): Monad {
    return new this(value);
  }
}