import testArg from '../other/testArg';


/**
 * @description 获取随机数
 * @param max 最大值
 * @param min 最小值
 * @returns 返回一个介于max和min之间的随机数 如果出现错误则返回0
 */
const random = (max: number, min: number): number => {
  const test = testArg([max, 'number'], [min, 'number']);
  if (!test) return 0;
  if (max <= min) {
    console.error('输入的最大值参数应该大于最小值参数');
    return 0;
  }
  return Math.random() * (max - min) + min;
}

export default random;