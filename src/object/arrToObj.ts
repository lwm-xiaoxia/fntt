/**
 * @description 数组转化为对象，如果出现重复键，就覆盖前者
 * @param params 传入多个数组参数 ['age', 18]
 * @returns 
 */
const arrToObj = (...params: Array<[string, any]>): Object => {
  const length = params.length;
  let result = {};
  let index = -1;
  while (++index < length) {
    const param = params[index];
    if ( Array.isArray(param) && param.length === 2 ) {
      const [key, value] = param;
      result[key] = value;
    } else {
      console.error(`传入的第${index + 1}个参数--${param}--不符合`);
    }
  }
  return result;
};

export default arrToObj;