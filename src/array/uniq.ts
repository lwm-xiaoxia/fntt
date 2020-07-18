import testArg from '../other/testArg';

// es6去重方法
// const uniq = (arr: any[]): any[] => {
//   const setArr = new Set(arr);
//   return [...setArr];
// };

/**
 * @description 数组去重
 * @param arr 要去重的数组
 * @returns 返回去重后的数组
 * @example
 * 
 *    uniq([1, 2, 3, 5, 5, 5, 3, 5, 2]);
 *    // => [1, 2, 3, 5]
 * 
 */
const uniq = <T>(arr: T[]): T[] => {
  if ( !testArg([arr, 'array']) ) return arr;
  let result = [];
  let map = new Map(); // 用来标记重复的值
  for (let value of arr) {
    if ( !map.get(value) ) {
      result.push(value);
      map.set(value, true);
    }
  }
  return result;
};

export default uniq;