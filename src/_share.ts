// 是否是浏览器环境
export const isBrowser = typeof window !== 'undefined';

//
export const UA = isBrowser && window.navigator.userAgent.toLowerCase();

// 是否是ie浏览器
export const isIE = UA && /msie|trident/.test(UA);

// 是否是ie9
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;

// 是都是Edge浏览器
export const isEdge = UA && UA.indexOf('edge/') > 0;

// 是否是安卓平台
export const isAndroid = (UA && UA.indexOf('android') > 0);

// 是否是苹果平台
export const isIOS = ( UA && /iphone|ipad|ipod|ios/.test(UA) );

// 是否是谷歌浏览器
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;


// 匹配url正则表达式
export const urlPatt = new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]', 'g');