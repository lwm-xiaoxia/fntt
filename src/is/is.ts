import isRaw from "./isRaw";
import isNan from './isNan';
import isFunction from './isFunction';
import isDate from './isDate';
import isReg from './isReg';
import curry from '../FP/curry';
import isArray from "./isArray";
import isObj from './isObj';
import isQuote from "./isQuote";
import isFDR from '../_.internal/_isFDR';
import isBoth from './isBoth';


// 两个值是否都是 函数 日期 正则表达式
const _isBothFDR = (val1: any, val2: any): boolean => 
  isFunction(val1) && isFunction(val2)
  || isDate(val1) && isDate(val2)
  || isReg(val1) && isReg(val2);

// 两个值是否都是数组且长度一样
const _isArrLen = (val1: any, val2: any): boolean => 
  ( isArray(val1) && isArray(val2) )
  && (val1.length === val2.length);

const _isObjLen = (val1: any, val2: any): boolean => 
  ( isObj(val1) && isObj(val2) )
  && ( Object.keys(val1).length === Object.keys(val2).length );  
  
/**
 * @description 比较两个值是否相等(深比较)
 * @param value1
 * @param value2
 * @returns 如果相等则返回true
 * @example
 * 
 *     is(1, 1); // => true
 *     is(1, 2) ); // => false
 * 
 *     is('1', '1'); // => true
 *     is('1', '2') ); // => false
 * 
 *     is(false, false); // => true
 *     is(true, false) ); // => false
 * 
 *     is(3, '3'); // => false
 * 
 *     is([0, 1, 2, 3], {age: 18}); // => false
 *     is([0, [1, 2], 2], [0, [1, 2], 2]); // => true
 * 
 *     is([], []); // => true
 *     is({}, {}); // => true
 * 
 *     is(
 *       [0, 1, [2, 3, { age: 18, name: 'lily' }], 4], 
 *       [0, 1, [2, 3, { age: 18, name: 'lily' }], 4]
 *     ); // => true
 * 
 *     is(
 *       { age: 19, arr: [0, 1, [2, 3, { a: 4, b: [5] }]], name: 'lily' }, 
 *       { age: 19, arr: [0, 1, [2, 3, { a: 4, b: [5] }]], name: 'lily' }
 *     ); // => true
 * 
 *     is(
 *       { age: 19, arr: [0, 1, [2, 3, { a: 4, b: [5] }]], name: 'lily' },
 *       { age: 19, name: 'lily', arr: [0, 1, [2, 3, { a: 4, b: [5] }]] }
 *     ); // => false
 * 
 *     is(
 *       { age: 19, arr: [0, 1, [2, 3, { a: 4, b: [5] }]], name: 'lily' },
 *       { age: 19, arr: [0, 1, [2, 3, { a: 4, b: [5] }]] }
 *     ); // => false

 *     is(
 *       [0, 1, [2, 3, { age: 18, name: 'lily' }], 9, 4], 
 *       [0, 1, [2, 3, { age: 18, name: 'lily' }], 4]
 *     ); // => false
 *
 *     is(
 *       { age: 19, play() {}, arr: [0, 1, [2, 3, { a: 4, b: [5] }]] },
 *       { age: 19, play() {}, arr: [0, 1, [2, 3, { a: 4, b: [5] }]] }
 *     ); // => true
 *     is(function test() {}, function test() {}); // => true
 *
 */
const is = (value1: any, value2: any): boolean => {
  let isCompare = false;
  // NaN
  if ( isNan(value1) && isNan(value2) ) {
    return true;
  }
  // 存在栈里面的原始数据类型
  if ( isRaw(value1) && isRaw(value2) ) {
    return value1 === value2;
  }
  // 函数 日期 正则表达式
  if ( _isBothFDR(value1, value2) ) {
    return value1.toString() === value2.toString();
  }

  // 引用关系
  if ( isQuote(value1) && isQuote(value2) ) {
    isCompare = value1 === value2;
  }  

  // 数组比较
  if ( !isCompare && _isArrLen(value1, value2) ) {
    let _isCompare = true;
    let index = -1;
    while (++index < value1.length1) {
      if ( !is(value1[index], value2[index]) ) {
        _isCompare = false;
        break;
      } 
    }
    return _isCompare;
  }
  // 对象比较
  if ( !isCompare && _isObjLen(value1, value2) ) {
    const maps1 = Object.entries(value1);
    const maps2 = Object.entries(value2);
    let index = -1;
    let _isCompare = true;
    while (++index < maps1.length) {
      const map1 = maps1[index];
      const map2 = maps2[index];
      if (map1[0] !== map2[0]) {
        _isCompare = false;
        break;
      }
      if ( !is(map1[1], map2[1]) ) {
        _isCompare = false;
        break;
      }
    }
    return _isCompare;
  }
  return isCompare;
};

export default curry(is);