/**
 * @description 获取数据类型
 * @param value 要获取类型的数据
 * @returns 返回数据类型的字符串
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