/**
 * @file 入口文件
 * @author 林炜敏
 */

/**
 * @module array模块
 * @description 数组相关的扩展封装
 */
export { default as rmArr } from './array/rmArr';
export { default as chunk } from './array/chunk';
export { default as andArr } from './array/andArr';
export { default as uniq } from './array/uniq';
export { default as statistic } from './array/statistic';
export { default as adjust } from './array/adjust';
export { default as arrCover } from './array/arrCover';
export { default as shuffle } from './array/shuffle';

/**
 * @module date模块
 * @description 日期相关的扩展封装
 */
export { default as formatDate } from './date/formatDate';

/**
 * @module DOM模块
 * @description DOM对象相关的扩展封装
 */


/**
 * @module event模块
 * @description 事件相关的扩展封装
 */

/**
 * @module function模块
 * @description 函数相关的扩展封装
 */
export { default as after } from './function/after';
export { default as antiShake } from './function/antiShake';
export { default as throttle } from './function/throttle';
export { default as performanceTime } from './function/performanceTime';
export { default as polling } from './function/polling';

/**
 * @module 函数式编程模块
 * @description 函数式编程相关的方法封装
 */
export { default as curry } from './FP/curry';
export { default as pipe } from './FP/pipe';
export { default as Functor } from './FP/Functor';
export { default as Maybe } from './FP/Maybe';
export { default as Ap } from './FP/Ap';
export { default as Monad } from './FP/Monad';
export { default as lazy } from './FP/lazy';
export { default as _lazy } from './FP/_lazy';
export { default as __lazy } from './FP/__lazy';
export { Left, Right } from './FP/Either';
export { default as IO } from './FP/IO';

/**
 * @module is模块
 * @description 对变量类型等判断
 */
export { default as isDate } from './is/isDate';
export { default as isEl } from './is/isEl';
export { default as isList } from './is/isList';
export { default as isNan } from './is/isNan';
export { default as isNumber } from './is/isNumber';
export { default as isObj } from './is/isObj';
export { default as isObjs } from './is/isObjs';
export { default as isPromise } from './is/isPromise';
export { default as isUrl } from './is/isUrl';
export { default as isRaw } from './is/isRaw';
export { default as isQuote } from './is/isQuote';
export { default as isFunction } from './is/isFunction';
export { default as isReg } from './is/isReg';
export { default as isArray } from './is/isArray';
export { default as is } from './is/is';

/**
 * @module number模块
 * @description 数字类型相关的扩展封装
 */
export { default as formatNum } from './number/formatNum';
export { default as int } from './number/int';
export { default as random } from './number/random';

/**
 * @module object模块
 * @description 对象相关的扩展封装
 */
export { default as andObj } from './object/andObj';
export { default as arrToObj } from './object/arrToObj';
export { default as objCover } from './object/objCover';

/**
 * @module obtain模块
 */

/**
 * @module other模块
 * @description 其他的各种函数封装
 */
export { default as range } from './other/range';
export { default as clone } from './other/clone';
export { default as toBase64 } from './other/toBase64';
export { default as isFullScreen } from './other/isFullScreen';
export { default as $dom } from './other/dom';
export { default as $event } from './other/event';

/**
 * @module string模块
 * @description 字符串相关的扩展封装
 */
export { default as escape } from './string/escape';
export { default as rvStr } from './string/rvStr';
export { default as toCase } from './string/toCase';
export { default as classNames } from './string/classNames';

/**
 * @module url模块
 * @description url相关的扩展封装
 */
export { default as parseUrl } from './url/parseUrl';
export { default as getUrlParam } from './url/getUrlParam';
export { default as param } from './url/param';