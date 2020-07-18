import { isBrowser } from '../_share';
import testArg from '../other/testArg';

type RetuenType = {
  hash?: string;
  host?: string;
  hostname?: string;
  href?: string;
  origin?: string;
  password?: string;
  pathname?: string;
  port?: string;
  protocol?: string;
  search?: string;
};

/**
 * @description 解析传入的url，如果没有传，则默认使用当前文档的url
 * @param url 要解析的url
 * @returns 返回解析完的url，以对象的形式返回。
 */
const parseURL = (url?: string): RetuenType => {
  if ( !testArg([url, 'string', 'undefined']) ) return {};
  if (!isBrowser) {
    console.error('不在浏览器环境内');
    return {};
  }
  url = url || location.href;
  return new URL(url);
};

export default parseURL;