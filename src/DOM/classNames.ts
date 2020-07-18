import isList from '../is/isList';
import isObjs from '../is/isObjs';

/**
 * @description 多个参数组成元素的类
 * @return 返回一个或多个类合集
 */
export const classNames = (...names: any[]): string => {
  let result = [];
  names.forEach(name => {
    if (typeof name === 'string') result.push(name);
    else if ( isList(name) ) {  //参数是数组
      name.forEach( item => result.push( classNames(item) ) )
    } 
    else if ( isObjs(name) ) {  //参数是对象
      Object.keys(name).forEach(key => {
        name[key] && result.push(classNames(key));     
      })
    } 
    else console.error(`传入的类最小单位类--${name}--应该为字符串`);
  })
  return result.join(' ');
}

export default classNames;