/**
 * @description 判断是否是日期对象
 * @param value 要判断的值
 * @returns 如果是传入的值是日期类型则返回true，如果不是则返回false
 * @virtual 
 * 
 *    const isDate = (value: any): boolean => value.constructor === Date;
 * 
 * @example 
 * 
 *    isDate(new Date()); // => true
 * 
 *    isDate({}); // => false
 * 
 */
const isDate = (value: any): boolean => value instanceof Date;

export default isDate;