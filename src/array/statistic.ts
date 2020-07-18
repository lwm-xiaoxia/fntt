import range from '../other/range';
import testArg from '../other/testArg';

interface returnType<T>{
  min?: T | T[];
  minNum?: number;
  max?: T | T[];
  maxNum?: number;
  numbers?: number[];
  values?: T[];
}

/**
 * @description 获取有效的key
 * @param length 数组长度
 * @param pre 上个key
 * @param obj 
 */
const _getIndexKey = (length: number, pre: number, obj: Object): number => {
  const numberLevel = String(length).length; // 数组长度的最大数量级 89 => 2
  const diffNumber = 1 / (10 ** numberLevel);
  const next = pre + diffNumber;
  if (obj[next] !== undefined) {
    return _getIndexKey(length, next, obj);
  } else return next;
};

/**
 * @description 获取自定义的key的临界值集合
 * @param values 
 * @param max max===true-最大临界值集合 max===false-最小临界值集合
 */
const _critical = (values: number[], max: boolean = true): number[] => {
  if (max) {
    const maxValue = Math.floor( Math.max(...values) );
    return values.filter( 
      value => range(value, `[${maxValue}, ${maxValue + 1})`) 
    );
  } else {
    const minValue = Math.min(...values);
    return values.filter(
      value => range(value, `[${minValue}, ${minValue + 1})`)
    );
  }
};

/**
 * @description 对数组统计
 * @param arr 要统计的数组
 * @returns 返回一个对象 里面包含出现 最多元素 对应的数量 最少的元素 对应的数量 数量的排序数组
 * @example
 * statistic(['l', 'h', 'n', 'm', 'l', 'm', 'l', 'n', 'm']);
 * // => { max: ["l", "m"], maxNum: 3, min: "h", minNum: 1, numbers: [1, 2, 3], values: ["h", "n", "l", "m"] }
 */
const statistic = <T>(arr: any[]): returnType<T> => {
  const length = arr.length;
  // 检验参数不通过
  if ( !testArg([arr, 'array']) ) return {};
  // 检验参数通过
  let map = new Map(); // 用来标记重复的值
  let statisticObj = {};
  for (let value of arr) {
    if ( map.has(value) ) map.set(value, map.get(value) + 1 );
    else map.set(value, 1);
  }
  for (const [value, number] of map) {
    // 这个key已经用了
    if (statisticObj[number] !== undefined) {
      const indexKey = _getIndexKey(length, number, statisticObj);
      statisticObj[indexKey] = value;
    } else statisticObj[number] = value;
  }
  const numbers = Object.keys(statisticObj).map(number => +number).sort();
  const values = numbers.map(number => statisticObj[number]);
  const minKeys = _critical(numbers, false); // 最小值的数量集合
  const maxKeys = _critical(numbers, true); // 最大值的数量集合
  const minNum = minKeys[0];
  const maxNum = maxKeys[0];
  const min = minKeys.length > 1
    ? minKeys.map(key => statisticObj[key])
    : statisticObj[minNum];
  const max = maxKeys.length > 1
    ? maxKeys.map(key => statisticObj[key])
    : statisticObj[maxNum]; 
  return { 
    min, 
    minNum, 
    max, 
    maxNum, 
    values, 
    numbers: [...new Set( numbers.map(num => Math.floor(num)) )], 
  };
};

export default statistic;