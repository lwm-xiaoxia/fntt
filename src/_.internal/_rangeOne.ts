/**
 * @description 是否在单个区间内
 * @param condition 验证条件  
 *    (x, y) 表示 x < value < y   
 *    (x, y] 表示 x < value <= y
 * @param value 要验证的值
 * @returns 返回会否在范围内
 */
const _rangeOne = (condition: string, value: number): boolean => {
  const patt = /^[\(\[]-?\d+,\s{0,}-?\d+[\)\]]$/;
  if ( typeof condition !== 'string' || !patt.test(condition) ) {
    console.error(`传入的条件--${condition}--不是有效条件`);
    return false;
  }
  const startCondition = /[\(\[]/.exec(condition)[0];
  const endCondition = /[\)\]]/.exec(condition)[0];
  const [start, end] = condition.match(/-?\d+/g);
  const inStart = (startCondition === '[') ? value >= +start : value > +start;
  const inEnd = (endCondition === ']') ? value <= +end : value < +end;
  return inStart && inEnd;
};

export default _rangeOne;