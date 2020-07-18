import testArg from '../other/testArg';

/**
 * @description 对象转为查询字符串
 * @param obj 要转成查询字符串的对象
 * @returns 返回转化后的查询字符串，如果是空对象或者传入的对象有误则返回空字符串
 * @example 
 * 
 *    param({ age: 18, name: 'lily', msg: 'hello' });
 *    // => age=18&name=lily&msg=hello
 */
const param = (obj: Object): string => {
  if ( !testArg([obj, 'object']) ) return '';
  return Object.entries(obj).map( p => p.join('=') ).join('&');
};

export default param;