type IterateeType = {
  func: Function;
  type: number;
};

/**
 * @class
 * @description 惰性求值
 */
class Lazy {

  private readonly _MAX_ARRAY_LENGTH: number = 4294967295; // 最大的数组长度 
  private readonly _LAZY_FILTER_FLAG: number = 1; // filter方法的标记

  private _values: any[]; // 缓存数据
  private _iteratees: IterateeType[] = []; //  缓存数据管道中进行“裁决”的方法
  private _takeCount: number; // 记录需要拿的符合要求的数据集个数

  constructor(values: any[]) {
    this._takeCount = this._MAX_ARRAY_LENGTH
    this._values = values;
  }

  // 根据 筛选方法iteratee 筛选数据
  filter(iterateeFunc: Function): Lazy {
    this._iteratees.push({
      'func': iterateeFunc,
      'type': this._LAZY_FILTER_FLAG,
    });
    return this;
  }

  // 截取n个数据
  take(n: number): Lazy {
    this._takeCount = n;
    return this;
  }

  // 惰性求值
  getValue() {
    const length = this._values.length;
    let index = -1, resIndex = 0, result = [];
    outer:
    while(++index < length && resIndex < this._takeCount){
      let iterIndex = -1;
      const value = this._values[index];
      while(++iterIndex < this._iteratees.length){
        // 内层循环处理链上的方法
        const { func, type } = this._iteratees[iterIndex];
        // 处理数据不符合要求的情况
        if( !func(value) ){
          if(type == this._LAZY_FILTER_FLAG) continue outer;
          else break outer;
        }
      }
      // 经过内层循环，符合要求的数据
      result[resIndex++] = value;
    }
    return result;
  }

}

export default function(values: any[]): Lazy {
  return new Lazy(values);
}