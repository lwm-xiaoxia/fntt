import testArg from '../other/testArg';

/**
 * @function
 * @description   函数防抖
 * @param delay   是否延迟执行
 * @param wait    设置的间隔时间
 * @param func    需要执行的函数
 * @returns       返回可被调用的函数
 */
const antiShake = (delay: boolean, wait: number, func: Function): Function => {
  const test = testArg(
    [delay, 'boolean'], 
    [wait, 'number'], 
    [func, 'function'],
  );
  if (!test) return undefined;
  let timer = null;
  let isPlay = true; // 是否可以执行函数，第一次默认值是true。
  // 返回可被执行的函数
  return (...args: any[]) => {
    let result; // func函数的返回值
    // 每一次设置新的定时器等待之前，都要先清空上一次设置的，确保间隔时间内只执行一次
    clearTimeout(timer);
    // 设置定时器：到达时间间隔后执行函数
    timer = setTimeout(() => {
      isPlay = true;
      if (delay) result = func.apply(null, args);
    }, wait);
    // 如果是事件触发就执行，把函数执行即可
    if (!delay && isPlay) {
      result = func.apply(null, args);
      isPlay = false;
    };
    return result;
  };
};

export default antiShake;