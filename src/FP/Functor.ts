/**
 * @class
 * @description 函子
 */
export default class Functor {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
  public map(func: Function): Functor {
    const result = func(this.value);
    return Functor.of(result);
  }
  static of(value): Functor {
    return new this(value);
  }
}

// 测试