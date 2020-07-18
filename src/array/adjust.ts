import curry from '../FP/curry';

/**
 * @description 将函数应用于数组给定索引处的值，
 * 并返回数组的新副本，其中给定索引处的元素替换为功能申请的结果。
 * @param index 
 * @param func 
 * @param arr 
 */
const adjust = (index: number, func: Function, arr: any[]): any[] => {
  const length = arr.length;
  if (index >= length || index < -length) return arr;
  const startIndex = index < 0 ? length : 0;
  const _index = startIndex + index;
  let _arr = [...arr];
  _arr[_index] = func(_arr[_index]);
  return _arr;
};

export default adjust;