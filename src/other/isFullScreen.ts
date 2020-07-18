/**
 * @description 判断是不是全面屏
 * @return true--是全面屏 false--不是全面屏
 */
const isFullScreen = (): boolean => {
  const rate = window.screen.height / window.screen.width;    
  // 临界判断值  
  const limit =  window.screen.height == window.screen.availHeight ? 1.8 : 1.65; 
  return rate > limit;
}

export default isFullScreen;

