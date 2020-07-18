import Functor from './Functor';
import pipe from './pipe';

/**
 * @class
 * @description Ap函子
 */
export default class Ap {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
  ap(f: Functor): Ap {
    const result = pipe(f.value, this.value);
    return Ap.of(result);

    // return pipe(f.value, this.value, Ap.of);
  }
  static of(value): Ap {
    return new this(value);
  }
}