import testArg from '../other/testArg';
import curry from '../FP/curry';

/**
 * @description 判断cover数组是否覆盖value数组
 * @param value 被包含的数组
 * @param cover 要包含的数组 
 * @returns 如果cover覆盖value则返回true，否则返回false
 */
const arrCover = <T>(value: T[], cover: T[]): boolean => {
  const isArg = testArg([value, 'array'], [cover, 'array']);
  if (!isArg) return false;
  return value.every( list => cover.includes(list) );
};

export default arrCover;