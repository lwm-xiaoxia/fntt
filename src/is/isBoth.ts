import getType from '../_.internal/_getType';

/**
 * @description  判断多个值是否是都一种类型，
 * 如果type === null,则以第一个要比较的值的类型作为参考类型
 * @param type 数据类型
 * @param args 
 * @returns 如果是传入的值都是统一数据类型true，如果不是则返回false
 */
const isBoth = (type: string | null, ...args: any[]): boolean => {
  if (type === null) type = getType(args[0]);
  return args.every( arg => getType(arg === type) );
};

export default isBoth;