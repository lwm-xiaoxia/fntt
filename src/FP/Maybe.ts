/**@class
 * @description Maybe函子
 */
export default class Maybe {
  value: any;
  constructor(value: any) {
    this.value = value;
  }
  public isNothing() {
    return this.value === undefined
      || this.value === null;
  }
  public map(func: Function): Maybe {
    return this.isNothing()
      ? Maybe.of(null)
      : Maybe.of( func(this.value) );
  }
  static of(value): Maybe {
    return new this(value);
  }
}
