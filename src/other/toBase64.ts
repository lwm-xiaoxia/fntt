import isEl from '../is/isEl';
import _imgToBase64 from '../_.internal/_imgToBase64';
import loadImg from './loadImg';
import testArg from '../other/testArg';

/**
 * @description 图片url地址转为base64
 * @param value 图片地址或者是图片节点
 * @returns 如果传入的是图片节点则返回base64字符串，如果传入的是图片地址则返回一个Promise对象 
 */
const toBase64 = (value: string | HTMLImageElement): Promise<any> | string => {

	// 参数验证
	if ( !testArg([value, 'string', isEl]) ) return '';

  // 类型保护
  if (typeof value === 'string') {
		return new Promise(resolve => {
			loadImg(value).then(img => {
				const base64 = _imgToBase64(img);
				resolve(base64);
			});
		})
  } 
  else {
		return _imgToBase64(value)
	}
};

export default toBase64;