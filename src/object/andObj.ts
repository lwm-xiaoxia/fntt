import isObj from '../is/isObj';
import arrToObj from './arrToObj';

/**
 * @description 传入多个对象获取其交集
 * @returns 返回对象的交集对象
 */
const andObj = (...params: Object[]): Object => {
  const lengths = params.map((obj, index) => {
    if ( isObj(obj) ) return Object.keys(obj).length;
    console.error(`第${index + 1}参数--${obj}--不是对象`);
    return -1;
  });
  // 如果有参数不是对象或空对象的话就返回空对象
  if ( !lengths.some(length => length > 0) ) return {};
  const minLength = Math.min(...lengths);
  const minIndex = lengths.indexOf(minLength);
  const minObj = params[minIndex];
  const andArr: Array<[any, any]> = (Object as any)
  .entries(minObj).filter(
    ([key, value]) => params.every(obj => obj[key] === value)
  );
  return arrToObj(...andArr);
};

export default andObj;