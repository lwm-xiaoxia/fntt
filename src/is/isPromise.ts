/**
 * @description 是否是promise对象
 * @param value 要判断的值
 * @returns 如果是传入的值是promise类型则返回true，如果不是则返回false
 * @virtual 
 * 
 *    const isPromise = (value: any): boolean => value instanceof Promise;
 * 
 *    const isPromise = (value: any): boolean => value.constructor === Promise;
 * 
 * @example 
 *  
 *    isPromise(new Promise(() => {})); // => true
 * 
 *    isPromise([]); // => false
 * 
 */
const isPromise = (value: any): boolean => {
  return !!value  
    && typeof value.then === 'function'
    && typeof value.catch === 'function';
};

export default isPromise;