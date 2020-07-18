/**
 * @description 判断是否是函数
 * @param value 要判断的值
 * @returns 如果是传入的值是函数类型则返回true，如果不是则返回false
 * @example 
 * 
 *    isFunction(() => {}); // => true
 * 
 *    isFunction(true); // => false;
 * 
 */
const isFunction = (value: any): boolean => typeof value === 'function';

export default isFunction;