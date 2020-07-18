/**
 * @class
 * @description Either函子
 */
export default class Either {
  left: any;
  right: any;
  constructor(left: any, right: any) {
    this.left = left;
    this.right = right;
  }
  public map(func: Function): Either {
    return this.right 
      ? Either.of( this.left, func(this.right) )
      : Either.of( func(this.left), this.right )
  }
  public static of(left, right): Either {
    return new this(left, right);
  }
}

export class Left {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
  public map(func: Function): Left {
    return this;
  }
  public static of(value: any): Left {
    return new this(value);
  }
}

export class Right {
  public value: any;
  constructor(value: any) {
    this.value = value;
  }
  public map(func: Function): Right {
    const result = func(this.value);
    return Right.of(result);
  }
  public static of(value: any): Right {
    return new this(value);
  }
}