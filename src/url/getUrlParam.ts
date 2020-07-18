import testArg from '../other/testArg';
import parseURL from './parseUrl';

/**
 * @description 获取url的查询部分
 * @param url 要查询的url
 * @returns 以对象的形式返回参数，如果传入的参数不对或其他错误则返回空对象
 */
const getUrlParam = (url?: string): Object => {
  if ( !testArg([url, 'string', 'undefined']) ) return {};
  let { search } = parseURL(url);
  search = search.replace(/\?/, '');
  let params = {};
  const searchArr = search ? search.split('&') : [];
  searchArr.forEach(paramStr => {
    const [key, value] = paramStr.split('=');
    params[key] = value;
  });
  return params;
};

export default getUrlParam;
