/**
 * @function
 * @description 性能分析，获取函数运行花费时间
 * @param func 要分析的函数包装函数
 * @returns 返回函数的运行花费时间
 */
const performanceTime = (func: Function): number => {
  const start = performance.now();
  func();
  const end = performance.now();
  return end - start;
};

export default performanceTime;