import testArg from '../other/testArg';
/**
 * @description 打乱数组
 * @param arr 要被打乱的数组
 * @returns 返回打乱后的数组
 */
const shuffle = <T>(arr: T[]): T[] => {
  if ( !testArg([arr, 'array']) ) return arr;
  const length = arr.length;
  let index = -1;
  let result = [].concat(arr);
  while (++index < length) {
    const randomIndex = parseInt( length * Math.random() + '' );
    const temp = result[index];
    result[index] = result[randomIndex];
    result[randomIndex] = temp;
  }
  return result;
};

export default shuffle;