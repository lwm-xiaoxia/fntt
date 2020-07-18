import testArg from '../other/testArg';
import curry from '../FP/curry';

/**
 * @description 定时器轮询封装，如果func有返回值则代表轮询结束。
 * @param duration 轮询时间间隔
 * @param func 要轮询的函数
 * @returns 返回promise对象带回轮询结果。
 */
const polling = (duration: number, func: Function): Promise<any> => {
  return new Promise((resolve, reject) => {
    const isArg = testArg([duration, 'number'], [func, 'function']);
    if ( !isArg ) return reject('参数检验不通过');
    const timer = setInterval(() => { 
      const fnValue = func();
      if ( fnValue !== undefined ) {
        clearInterval(timer);
        resolve(fnValue);
      }
    }, duration);
  })
};

export default curry(polling);