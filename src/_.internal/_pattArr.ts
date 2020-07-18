import isNumber from '../is/isNumber';

type PattFuncType = (value: any, index: number) => boolean;
type HandleFuncType = (value: any, index: number) => any;

/**
 * @description
 * @param handleFunc 处理匹配到的数据的函数
 * @param condition 匹配数据的参数
 * @param arr 要被处理的数组
 * @returns 处理后的数组
 */
const _pattArr = (
  handleFunc: HandleFuncType, 
  condition: number | number[] | PattFuncType, 
  arr: any[],
): any[] => {
  const _condition = isNumber(condition) ? [condition] : condition;
  const length = arr.length;
  let index = -1;
  let result = [];
  while (++index < length) {
    const value = arr[index];
    const isPatt = (typeof _condition === 'function')
      ? (_condition as any)(value, index)
      : (_condition as any).includes(index);
    // 匹配到到  
    if (isPatt) {
      /**
       * handleFunc函数处理后的数据用来替换匹配到的数据，
       * 如果没返回数据就删除该匹配项(resultValue === undefined)
       */
      const resultValue = handleFunc(value, index);
      (typeof resultValue !== 'undefined') && result.push(resultValue); 
    } 
    // 没匹配到的就原原本本复制回去
    else {
      result.push(value)
    }
  }
  return result;
};

export default _pattArr;