import _pattArr from '../_.internal/_pattArr';
import testArg from '../other/testArg';

type fnType = (value: any, index: number) => boolean;
type conditionType = number | Array<any> | fnType;

/**
 * @description 删除满足条件的数组的某一元素
 * @param condition 函数返回满足条件 可以传要删到数组 可以传要删哪一个
 * @param arr 要操作的数组
 * @returns 返回删除后到数组
 * @example rmArr(2, [0, 1, 2, 3, 4]);									//=> [0, 2, 3, 4]
 * 					rmArr([1, 3], [0, 1, 2, 3, 4]);							//=> [0, 2, 4]
 * 					rmArr(value => value > 1, [0, 1, 2, 3, 4]);	//=> [0, 1]
 */
const rmArr = <T>(condition: conditionType, arr: Array<T>): Array<T> => {
  // 参数检验
  const isArg = testArg([condition, 'number', 'array', 'function'], [arr, 'array']);
  // 参数检验不通过
  if (!isArg) return arr;
  // 参数检验通过
	if (typeof condition === 'number') {
		let temp = [...arr];
		temp.splice(condition, 1);
		return temp;
  } 
  return _pattArr(value => {}, condition, arr);
}
export default rmArr;