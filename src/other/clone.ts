import isRaw from '../is/isRaw';
import isObj from '../is/isObj';
import isArray from '../is/isArray';
import isFDR from '../_.internal/_isFDR';

// 判断是不是对象或者数组
const _isObjArr = (value: any): boolean => 
  isObj(value) 
  || isArray(value);

// 克隆对象
const _cloneObj = (func: Function, obj: Object): Object => {
  let result = {};
  for (let key in obj) {
    const value = obj[key];
    if ( _isObjArr(value) ) result[key] = func(value);
    else result[key] = value;
  }
  return result;
};

// 克隆数组
const _colneArr = <T>(func: Function, arr: T[]): T[] => {
  let result = [];
  for (let value of arr) {
    if ( _isObjArr(arr) ) result.push( func(value) );
    else result.push(value);
  }
  return result;
}

/**
 * @description 用来深克隆原始值，数组，对象，函数，
 * 对于 Date,  RegExp, Map, Set等是浅拷贝
 * @param target 要克隆的值
 * @return 返回一个深克隆后的值
 */
const colne = (value: any) => {
  // 原始值、函数、正则表达式、日期对象
  if ( isRaw(value) || isFDR(value) ) {
    return value;
  }
  else if ( isObj(value) ) {
    return _cloneObj(colne, value);
  }
  else if ( isArray(value) ) {
    return _colneArr(colne, value);
  }
  return value;
}

export default colne;