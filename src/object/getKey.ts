import testArg from '../other/testArg';

/**
 * @description 通过value来获取对象的key
 * @param obj 要操作的对象
 * @param value 要提供的值
 * @returns 返回对应的key
 */
const getKey = (obj: Object, value: any): string | undefined => {
  if ( !testArg([obj, 'object']) ) return;
  const objArr = (Object as any).entries(obj);
  let result;
  for (let i = 0,length = objArr.length; i < length; i++) {
    const [ _key, _value ] = objArr[i];
    if (value === _value) {
      result = _key;
      break;
    }
  }
  return result;
};

export default getKey;