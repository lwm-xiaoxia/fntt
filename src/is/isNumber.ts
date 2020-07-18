import isNan from './isNan';

/**
 * @description 判断是否是数字类型
 * @param value 要判断的值
 * @returns 如果是传入的值是数字类型则返回true，如果不是则返回false
 * @example 
 * 
 *    isNumber(14); // => true
 * 
 *    isNumber(NaN) // => false;
 * 
 */
const isNumber = (value: any): boolean => {
  return typeof value === 'number'
    && !isNan(value);
};

export default isNumber;