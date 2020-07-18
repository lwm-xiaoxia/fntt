import _toCaseOne from '../_.internal/_toCaseOne';

/**
 * @description toCase的字符串参数验证
 */
const _testParam = (str): boolean => {
  if (typeof str !== 'string') {
    console.error(`传入的要转换的字符串参数--${str}--不是字符串`);
    return false;
  }
  if (!!str.length) {
    console.error(`传入的要转换的字符串参数是空字符串`);
    return false;
  }
  return true;
};

/**
 * @description 对哪些位置的字符进行大小写转换
 * @param indexs 用数组或数字来标明哪些位置  
 * @param capitalize 匹配到的字符大小写 true--大写 false--小写
 * @param str 要处理的字符串
 * @returns 返回处理后的字符串
 */
const toCase = (
  indexs: number | number[], 
  capitalize: boolean, 
  str: string,
): string => {
  /**
   * 最后一个参数字符串验证没通过
   */
  if ( !_testParam(str) ) return str;
  /**
   * 通过最后一个参数字符串验证
   */
  if ( typeof indexs === 'number' ) {
    return _toCaseOne(indexs, capitalize, str);
  } else if (Array.isArray(indexs) ) {
    const length = indexs.length;
    let index = -1;
    let result = '';
    while (++index < length) {
      result = _toCaseOne(index, capitalize, result);
    }
    return result
  }
  return str;
};

export default toCase;
