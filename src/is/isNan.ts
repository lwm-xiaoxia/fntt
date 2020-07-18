/**
 * @description 判断是否是NaN
 * @param value 要判断的值
 * @returns 如果是传入的值是NaN则返回true，如果不是则返回false
 * @example 
 * 
 *    isNan(NaN); // => true
 * 
 *    isNan(6) // => false;
 * 
 */
const isNan = (value: any): boolean => typeof value === 'number' && value !== value;

export default isNan;