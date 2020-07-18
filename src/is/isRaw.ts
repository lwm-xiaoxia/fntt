/**
 * @description 判断是不是原始数据
 * @param value 要判断的值
 * @returns 如果是传入的值是原始数据类型则返回true，如果不是则返回false
 * @example 
 *  
 *    isRaw(Symbol('hello')); // => true
 * 
 *    isRaw([]); // => false
 * 
 */
const isRaw = (value: any): boolean => 
  typeof value === 'string' 
    || typeof value === 'number' 
    || typeof value === 'boolean' 
    || typeof value === 'undefined' 
    || typeof value === 'symbol'
    || value === null;

export default isRaw;