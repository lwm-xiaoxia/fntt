/**
 * @description 判断是不是引用类型
 * @param value 要判断的值
 * @returns 如果是传入的值是引用类型则返回true，如果不是则返回false
 * @example 
 *  
 *    isQuote(() => {}); // => true
 * 
 *    isQuote(8); // => false
 * 
 */
const isQuote = (value: any): boolean => 
  value !== null
  && (
    typeof value === 'object'
    || typeof value === 'function'
  );

export default isQuote;