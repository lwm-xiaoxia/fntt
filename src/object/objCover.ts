import isObj from '../is/isObj';

type objType = { [propName: string]: any };
/**
 * @description 判断cover对象是否覆盖value对象
 * @param value 被包含的对象
 * @param cover 要包含的对象 
 * @returns {boolean}
 */
const objCover = (value: objType, cover: objType): boolean => {
  if (isObj(value) && isObj(cover)) {
    const valueKeys = Object.keys(value);
    const coverKeys = Object.keys(cover);
    return valueKeys.every(key => {
      if ( !(coverKeys as any).includes(key) ) return false;
      return value[key] === cover[key];
    })
  }
  console.error(`传入的两个对象参数--${value}--不是对象或--${cover}--不是对象`);
  return false;
};

export default objCover;