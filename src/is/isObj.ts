/**
 * @description 判断是否是对象类型
 * @param value 要判断的值
 * @returns 如果是传入的值是对象类型则返回true，如果不是则返回false
 * @example 
 * 
 *    isObj({}); // => true
 * 
 *    isObj([]); // => false;
 * 
 */
const isObj = (value: any): boolean => 
  Object.prototype.toString.call(value) === '[object Object]';

export default isObj;