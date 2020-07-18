/**
 * @description 判断是否是数组且有元素
 * @param value 要判断的值
 * @returns 如果是传入的值是数组且有元素则返回true，如果不是则返回false
 * @example 
 * 
 *    isList(4);  //=> fasle
 * 
 *    isList([]); //=> fasle
 * 
 *    isList([0, 1, 2, 3, 4]);  //=> true  
 * 
 */
const isList = (value: any): boolean => Array.isArray(value) && !!value.length;

export default isList;