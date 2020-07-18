/**
 * @description 判断是否是DOM元素对象
 * @param value 要判断的值
 * @returns 如果是传入的值是DOM元素对象则返回true，如果不是则返回false 
 * @example 
 * 
 *    isEl(document.createElement('div')); // => true
 * 
 *    isEl(123); // => false
 * 
 */
const isEl = (value: any): boolean => value instanceof HTMLElement;

export default isEl;