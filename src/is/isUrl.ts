import { urlPatt } from '../_share';

/**
 * @description 判断是不是url
 */
const isUrl = (url: string): boolean => {
  if (typeof url !== 'string') return false;
  return urlPatt.test(url);
};

export default isUrl;