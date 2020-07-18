const _pipe = (value: any, ...args: Function[]) => {
  args.unshift(value);
  return args.reduce((result, fn) => fn(result));
};

/**
 * @description 从左往右执行函数组合。
 * 第一个函数可以是任意元函数（参数个数不限），
 * 其余函数必须是一元函数。
 * @param value 第一个值，可以是普通值，也可以是一个函数
 * @param args 后续跟着的一元函数
 * @returns 如果第一个是函数则返回一个函数，如果第一个是值的话则返回求解后的值
 * @example 
 * 
 *    pipe(3, x => x + 1, x => x * 2);
 *    // => 8
 * 
 *    const fn = pipe((x, y) => x + y, x => x + 1, x => x * 2);
 *    fn(3, 4);
 *    // => 16    
 */
const pipe = (value: any, ...args: Function[]) => {
  if (typeof value === 'function') {
    return (..._args) => _pipe(value(..._args), ...args);
  }
  return _pipe(value, ...args);
};

export default pipe;
