import testArg from '../other/testArg';

/**
 * @description 取整
 * @param value 
 * @example  
 * 
 *    int(2.5); // =>2
 * 
 *    int(-2.5); // => -2 
 * 
 */          
const int = (value: number): number => {
  if ( !testArg([value, 'number']) ) return value;
  /** 多种方法 */
  // return value >> 0;
  // return value << 0;
  // return value | 0
  return ~~value;
};

export default int;