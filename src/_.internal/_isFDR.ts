import isFunction from '../is/isFunction';
import isDate from '../is/isDate';
import isReg from '../is/isReg';

/**
 * @description 判断一个值是否是函数、日期、正则表达式
 * @param value 要判断的值
 * @returns 如果是传入的值满足条件返回true，如果不是则返回false 
 */
const isFDR = (value: any): boolean => 
  isFunction(value) 
  || isDate(value) 
  || isReg(value)

export default isFDR;