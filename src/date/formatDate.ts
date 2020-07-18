import formatNum from '../number/formatNum';
import testArg from '../other/testArg';

/**
 * @description  正则匹配替换回调工厂
 * @param pattValue 匹配到到值
 * @param value 要替换成这个值
 */
const _callbackFn = (value: number): Function => {
  return (pattValue: string): string => {
    const length = String(value).length;
    const pattLength = pattValue.length;
    if (pattLength > length) return formatNum(pattLength, value) 
    else return value + '';
  };
};

/**
 * 时间格式化
 * @param type 要得到的时间格式 YYYY-MM-DD hh: mm: ss
 * @param date 要格式化的时间对象，如果没传就默认当前时间
 * @return 格式化后的时间字符串
 * @example 
 * formatDate('YYYY-MM-DD hh: mm: ss', new Date(2020, 2, 15, 13, 45, 55));
 * // => 2020-03-15 13: 45: 55
 */
const formatDate = (type: string, date: Date = new Date()): string => {
  if ( !testArg([type, 'string'], [date, 'date']) ) return '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sex = date.getSeconds();
  type = type.replace( /Y+/, (_callbackFn(year) as any) );
  type = type.replace( /M+/, (_callbackFn(month) as any) );
  type = type.replace( /D+/, (_callbackFn(day) as any) );
  type = type.replace( /h+/, (_callbackFn(hour) as any) );
  type = type.replace( /m+/, (_callbackFn(min) as any) );
  type = type.replace( /s+/, (_callbackFn(sex) as any) );
  return type;
}

export default formatDate;
