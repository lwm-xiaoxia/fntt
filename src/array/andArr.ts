/**
 * @description 取多个数组的交集
 * @returns 取到的交集第数组
 * @example andArr([0, 1, 2], [2, 3, 4], [3, 5, 2])  //=> [2]
 */
const andArr = <T>(...params: Array<T[]>): T[] => {
  // 获取所有数组第长度组成数组
  const lengths = params.map((arr, index) => {
    if ( Array.isArray(arr) ) return arr.length;
    console.error(`第${index + 1}参数--${arr}--不是数组`);
    return null;
  });
  // 如果有参数不是数组的话就返回空数组
  if ( (lengths as any).includes(null) ) return [];
  const minLength = Math.min(...lengths);
  const minIndex = lengths.indexOf(minLength);
  return params[minIndex].filter(value => {
    return params.every(
      arr => (arr as any).includes(value)
    )
  })
};

export default andArr;