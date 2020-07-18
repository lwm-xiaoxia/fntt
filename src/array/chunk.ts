import int from '../number/int';
import testArg from '../other/testArg';

/**
 * @description 将数组（array）拆分成多个 size 长度的区块，
 * 并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，
 * 那么最后剩余的元素将组成一个区块。
 * @param size 每个数组区块的长度
 * @param arr 需要处理的数组
 * @example  chunk(3, [0, 1, 2, 3, 4, 5 ,6 ,7, 8, 9]) 
 *           //=> [0, 1, 2], [3, 4, 5], [6, 7, 8], [9]
 */
const chunk = <T>(size: number, arr: T[]): T[] => {
  if ( !testArg([size, 'number'], [arr, 'array']) ) return arr;
  size = int(size);
  const length = arr.length;
  let index = 0;
  let result = [];
  while (index < length) {
    const chunkArr = arr.slice(index, index += size);
    result.push(chunkArr);
  }
  return result;
};

export default chunk;