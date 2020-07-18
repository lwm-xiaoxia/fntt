import getKey from '../object/getKey';

const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * @description 转义string中的 "&", "<", ">" , '"' , "'" , 和 "`" 字符为HTML实体字符。
 * @param dir true--正转 false-逆转
 * @param str 要转义的字符串
 * @returns 返回转义后的字符串
 */
const escape = (dir: boolean, str: string): string => {
  if (typeof str !== 'string') {
    console.error(`传入的字符串参数--${str}--不是字符串`);
    return str;
  }
  if (dir) {
    return str.replace(
      /[<>&'"]/g, 
      value => htmlEscapes[value]
    )
  } else {
    return str.replace(
      /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
      value => getKey(htmlEscapes, value),
    )
  }
};

export default escape;