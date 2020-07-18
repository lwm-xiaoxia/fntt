(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
     * @description 函数柯里化
     * const fn = curry( (a, b ,c) => a + b + c );
     * 以下几个都是等价的
     * fn(1)(2)(3)
     * fn(1)(2, 3)
     * fn(1, 2)(3)
     * fn(1, 2, 3)
     * @param func 要被柯里化的函数
     * @returns 柯里化后返回一个新的函数
     * @example
     *
     *     const fn = adjust(3, value => value.toUpperCase(value));
     *     fn(['a', 'b', 'c', 'd']);
     *     // => ["a", "b", "c", "D"]
     */
    var curry = function (func) {
        var totalArgs = [];
        return function _curry() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            totalArgs = totalArgs.concat(args);
            return totalArgs.length < func.length
                ? _curry.bind(null)
                : func.apply(void 0, __spread(totalArgs));
        };
    };

    /**
     * @description 将函数应用于数组给定索引处的值，
     * 并返回数组的新副本，其中给定索引处的元素替换为功能申请的结果。
     * @param index
     * @param func
     * @param arr
     */
    var adjust = function (index, func, arr) {
        var length = arr.length;
        if (index >= length || index < -length)
            return arr;
        var startIndex = index < 0 ? length : 0;
        var _index = startIndex + index;
        var _arr = __spread(arr);
        _arr[_index] = func(_arr[_index]);
        return _arr;
    };
    var adjust$1 = curry(adjust);

    // 是否是浏览器环境
    var isBrowser = typeof window !== 'undefined';
    //
    var UA = isBrowser && window.navigator.userAgent.toLowerCase();
    // 是否是ie浏览器
    var isIE = UA && /msie|trident/.test(UA);
    // 是否是ie9
    var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
    // 是都是Edge浏览器
    var isEdge = UA && UA.indexOf('edge/') > 0;
    // 是否是安卓平台
    var isAndroid = (UA && UA.indexOf('android') > 0);
    // 是否是苹果平台
    var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
    // 是否是谷歌浏览器
    var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

    console.log(adjust$1(2, function (value) { return value.toUpperCase(value); }, ['a', 'b', 'c', 'd']));

}());
