// const rvStr = value => {
//   if (typeof value !== 'string') {
//     console.error(`传入第字符串参数--${value}--不是字符串`);
//     return '';
//   }
//   return value.split('').reverse().join('');
// };

/**
 * @description 反转字符串
 * @param 要处理第字符串
 * @returns 返回处理后第字符串，如果传入的参数不对则返回空字符串
 */
const rvStr = (value: string): string => {
  if (typeof value !== 'string') {
    console.error(`传入第字符串参数--${value}--不是字符串`);
    return '';
  }
  const length = value.length;
  let result = '';
  let index = -1;
  let lastIndex = length;
  while (++index < length) {
    // result = result.concat( value.charAt(--lastIndex) );
    result += value.charAt(--lastIndex);
  }
  return result;
};

export default rvStr;