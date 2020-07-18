/**
 * @description 将数字限制在指定的范围内。
 * @param min 
 * @param max 
 * @param value 要限制的数字
 * @returns 返回限定后的数字
 */
const clamp = (min: number, max: number, value: number): number => {
  if (min > max) {
    throw new Error('传入的最大值应该大于最小值');
  }
  return value < min
    ? min
    : value > max
      ? max
      : value;
};

export default clamp