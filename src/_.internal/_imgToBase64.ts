/**
 * @description 把图片节点转为base64
 * @param img 要转为base64的图片节点
 * @returns 返回base64字符串
 */
const _imgToBase64 = (img: HTMLImageElement): string => {
	const canvasEl = document.createElement('canvas');
	const width = canvasEl.width = img.width;
	const height = canvasEl.height = img.height;
	const ctx = canvasEl.getContext('2d');
	ctx.drawImage(img, 0, 0, width, height);
	return canvasEl.toDataURL();
};

export default _imgToBase64;