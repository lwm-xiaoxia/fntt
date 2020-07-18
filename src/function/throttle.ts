import testArg from '../other/testArg';

/**
 * @function
 * @description 节流函数
 * @param wait 设置的间隔时间
 * @param func 需要执行的函数
 * @returns 返回可被调用的函数
 */
const throttle = (wait: number, func: Function): Function => {
  const isParam = testArg([wait, 'number'], [func, 'function']);
  if (!isParam) return;
  let pre = 0;
  return (...args: any[]) => {
    const now = performance.now();
    if (now - pre >= wait) {
      pre = now;
      return func.apply(null, args);
    }
  };
};

export default throttle;