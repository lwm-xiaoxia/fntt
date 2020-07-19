/**
 * @description 获取数据类型
 * @param value 要获取类型的数据
 * @returns 返回数据类型的字符串
 * @example 
 *  
 *    getType(2);                         // 'number'
 *    getType('hello');                   // 'string'
 *    getType(true);                      // 'boolean'
 *    getType();                          // 'undefined'
 *    getType(null);                      // 'null'
 *    getType(NaN);                       // 'NaN'
 *    getType( Symbol() );                // 'symbol' 
 *    getType({ age: 18, name: 'lily' }); // 'object'
 *    getType([0, 1]);                    // 'array'
 *    getType( new Date() );              // 'date'
 *    getType( new RegExp('\s+') );       // 'regexp'
 *    getType( new Set() );               // 'set'
 *    getType( new Map() );               // 'map'
 *    getType( Math );                    // 'math'
 *    getType( history );                 // 'history'
 *    getType( window );                  // 'window'
 * 
 */
const getType = (value: any): string => {
  if (typeof value === 'number' && value !== value) {
    return 'NaN';
  }
  const toString = Object.prototype.toString;
  const type = toString.call(value).match(/\w+/g)[1];
  return type.toLocaleLowerCase();
};

export default getType;