import isObj from '../is/isObj';

/**
 * 深拷贝
 * @param target 要深拷贝的对象
 * @return 返回一个拷贝后的对象
 */
const deepCopy = (target: any): any => {
  // 判断是不是对象或者数组
  const isObjArr = value => isObj(value) || Array.isArray(value);
  // 如果是对象
  if (isObj(target)) { 
    let result = {};
    for (let key in target) {
      const value = target[key];
      if ( isObjArr(value) ) result[key] = deepCopy(value); 
      else result[key] = value; 
    }
    return result;
  } else if (Array.isArray(target)) { // 如果是数组
    let result  = [];
    for (let value of target) {
      if ( isObjArr(value) ) result.push(deepCopy(value)); 
      else result.push(value);
    }
    return result;
  }
  console.warn('输入的要神拷贝的值不是引用类型');
  return target;
}

export default deepCopy;