import testArg from '../other/testArg';

/**
 * @description 数字格式化几位数 前面补0
 * @param digit 几个位
 * @param number 要格式化到数字
 * @return 格式化后的数字
 * @example 
 * formatNum(3, 5)
 * // => '005'
 */
const formatNum = (digit: number, num: number): string => {
  const isArg = testArg([digit, 'number'], [num, 'number']);
  if (!isArg) return String(num);
  //const numArr = Array.from(String(number)); //或者
  const numArr = (num + '').split(''); 
	const length = numArr.length
	if (length >= digit) {
		return numArr.slice(length - digit).join('');
	} else {
		let add = ( new Array(digit - length) as any ).fill(0);
		return add.concat(numArr).join('');
	}
}

export default formatNum;