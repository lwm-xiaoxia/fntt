import testArg from '../other/testArg';

/**
 * @description after函数调用number次后才调用func函数
 * @param number 几次后
 * @param func 要执行的回调函数
 */
const after = (number: number, func: Function): Function => {
  if ( !testArg([number, 'number'], [func, 'function']) ) {
    throw new TypeError(`传入的参数类型有误`);
  }
  return (...args: any[]) => {
    if (--number < 1) return func.apply(this, args);
  };
};

export default after;