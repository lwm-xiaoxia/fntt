import pipe from './pipe';

/**
 * @class
 * @description IO操作
 */
export default class IO {
  public fn: Function;
  constructor(fn: Function) {
    this.fn = fn;
  }
  public map(func: Function): any {
    const result = pipe(this.fn, func);
    return new IO(result);
  }
  public static of(func: Function) {
    return new this( () => func );
  }
}

