/**
 * @description 传入图片url获取加载完的图片节点
 * @param src 图片地址
 * @returns 返回一个携带图片节点的promise对象
 */
const loadImg = (src: string): Promise<HTMLImageElement> => {
	const img = new Image();
  img.setAttribute('src', src);
  return new Promise(resolve => {
    img.addEventListener('load', e => resolve(img));
  })
	
};

export default loadImg;