import isObj from './isObj';

/**
 * @description 判断是否是对象且有元素
 * @param value 要判断的值
 * @returns 如果是传入的值是对象且有元素则返回true，如果不是则返回false
 * @example 
 * 
 *    isObjs({ age: 18, name: 'lily' }); // => true
 * 
 *    isObjs({}); // => false;
 * 
 */
const isObjs = (value: any): boolean => 
  isObj(value) && !!Object.keys(value).length;

export default isObjs;