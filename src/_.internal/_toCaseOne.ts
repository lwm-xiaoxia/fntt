/**
 * @description 对单个位置的字符进行大小写转换
 * @param index 第几个字符串位置  
 * @param capitalize 匹配到的字符大小写 true--大写 false--小写
 * @param str 要处理的字符串
 * @returns 返回处理后的字符串
 */
const _toCaseOne = (index, capitalize, str) => {
  const pattStr = str.charAt(index);
  const startStr = str.slice(0, index);
  const endStr = str.slice(index + 1);
  return startStr 
    + ( capitalize 
        ? pattStr.toUpperCase() 
        : pattStr.toLowerCase() )
    + endStr;
}

export default _toCaseOne;