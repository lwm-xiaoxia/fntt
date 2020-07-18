/**
 * @description 判断是否是正则表达式
 * @param value 要判断的值
 * @returns 如果是传入的值是正则表达式则返回true，如果不是则返回false
 * @example 
 * 
 *    isFunction(() => {}); // => true
 * 
 *    isFunction(true); // => false;
 * 
 */
const isReg = (value: any): boolean => value instanceof RegExp;

export default isReg;