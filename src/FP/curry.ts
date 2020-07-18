
// const curryN = (func: Function): Function => {
//   let totalArgs = [];
//   return function _curry(...args: any[]) {
//     totalArgs = totalArgs.concat(args);
//     return totalArgs.length < func.length
//       ? _curry.bind(null)
//       : func(...totalArgs);
//   };
// };

/**
 * @description 函数柯里化
 * const fn = curry( (a, b ,c) => a + b + c );
 * 以下几个都是等价的   
 * fn(1)(2)(3)
 * fn(1)(2, 3)
 * fn(1, 2)(3)
 * fn(1, 2, 3)
 * @param func 要被柯里化的函数
 * @returns 柯里化后返回一个新的函数
 * @example 
 * 
 *     const fn = adjust(3, value => value.toUpperCase(value));
 *     fn(['a', 'b', 'c', 'd']);
 *     // => ["a", "b", "c", "D"]
 */
const curry = (fn: Function, totalArgs = []): Function => 
  (...args: any[]) => {
    const newArgs = totalArgs.concat(args); 
    return newArgs.length < fn.length 
      ? curry(fn, newArgs)
      : fn(...newArgs);
  }

export default curry;