import isNumber from '../is/isNumber';
import _rangeOne from '../_.internal/_rangeOne';
import testArg from '../other/testArg';

// const range = (value: number, ...params: any[]): boolean => {
//   return params.some((item, index) => {
//     if ( !Array.isArray(item) ) {
//       console.error(`传入第第${index + 1}个区间不是数组`);
//       return false;
//     }
//     const [ start, end, inStart, inEnd ] = item;
//     const isStart = inStart ? value >= start : value > start;
//     const isEnd = inEnd ? value <= end : value < end;
//     return isStart && isEnd;
//   });
// };


/**
 * @description 是否在区间内 主要用来优化 if-else
 * @param value 要验证的值
 * @returns 返回会否在范围内
 */
const range = (value: number, ...conditions: string[]): boolean => {
  if ( !testArg([value, 'number']) ) return false;
  return conditions.some(
    condition => _rangeOne(condition, value)
  );
};

export default range;
