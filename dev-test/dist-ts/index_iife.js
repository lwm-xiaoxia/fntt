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
     * @description 获取数据类型
     * @param value 要获取类型的数据
     * @returns 返回数据类型的字符串
     * @example
     *
     *    getType(2);                         // 'number'
     *    getType('hello');                   // 'string'
     *    getType(true);                      // 'boolean'
     *    getType();                          // 'undefined'
     *    getType(null);                      // 'null'
     *    getType(NaN);                       // 'NaN'
     *    getType( Symbol() );                // 'symbol'
     *    getType({ age: 18, name: 'lily' }); // 'object'
     *    getType([0, 1]);                    // 'array'
     *    getType( new Date() );              // 'date'
     *    getType( new RegExp('\s+') );       // 'regexp'
     *    getType( new Set() );               // 'set'
     *    getType( new Map() );               // 'map'
     *    getType( Math );                    // 'math'
     *    getType( history );                 // 'history'
     *    getType( window );                  // 'window'
     *
     */
    var getType = function (value) {
        if (typeof value === 'number' && value !== value) {
            return 'NaN';
        }
        var toString = Object.prototype.toString;
        var type = toString.call(value).match(/\w+/g)[1];
        return type.toLocaleLowerCase();
    };

    /**
     * @description 检验参数并提示错误
     * @param inspectParams 参数的数组列表
     * @returns 返回出参数检验结果
     */
    var testArg = function () {
        var inspectParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            inspectParams[_i] = arguments[_i];
        }
        var index = -1;
        var inspect = true; // 所有参数检查结果
        // 对每个参数列表遍历，检验每个参数
        while (++index < inspectParams.length) {
            var _a = __read(inspectParams[index]), param = _a[0], inspectParam = _a.slice(1);
            var listLength = inspectParam.length;
            var listIndex = -1;
            /**
             * 每个参数到检验列表
             * 成功加一，失败不变
             * 如果大于0就说明检验成功
             */
            var inspectList = 0;
            // 对每个参数列表多个类型遍历
            while (++listIndex < listLength) {
                var isLast = listIndex >= listLength - 1; // 是不是某个参数对最后一个检验
                var test = inspectParam[listIndex];
                var errMsg = "\u4F20\u5165\u7684\u53C2\u6570--" + param + "--\u662F" + getType(param) + "\u7C7B\u578B\uFF0C\u5B9E\u9645\u5E94\u8BE5\u4E3A" + test + "\u7C7B\u578B\uFF0C\u53C2\u6570\u68C0\u9A8C\u4E0D\u901A\u8FC7";
                var isTest = typeof test === 'string' || typeof test === 'function';
                if (!isTest) {
                    console.error("\u4F20\u5165\u7684\u9A8C\u8BC1\u9700\u8981\u51FD\u6570\u6216\u8005\u5B57\u7B26\u4E32");
                    return;
                }
                var paramTest = typeof test === 'string'
                    ? getType(param) === test
                    : test(param);
                inspectList += paramTest ? 1 : 0;
                // 发现有检验成功的直接结束循环
                if (inspectList > 0)
                    break;
                // 多个类型检验都没通过打印出错误信息
                isLast && console.error(errMsg);
            }
            inspect = inspect && (inspectList > 0);
            if (!inspect)
                break;
        }
        return inspect;
    };

    /**
     * @description 打乱数组
     * @param arr 要被打乱的数组
     * @returns 返回打乱后的数组
     */
    var shuffle = function (arr) {
        if (!testArg([arr, 'array']))
            return arr;
        var length = arr.length;
        var index = -1;
        var result = [].concat(arr);
        while (++index < length) {
            var randomIndex = parseInt(length * Math.random() + '');
            var temp = result[index];
            result[index] = result[randomIndex];
            result[randomIndex] = temp;
        }
        return result;
    };

    var _pipe = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        args.unshift(value);
        return args.reduce(function (result, fn) { return fn(result); });
    };
    /**
     * @description 从左往右执行函数组合。
     * 第一个函数可以是任意元函数（参数个数不限），
     * 其余函数必须是一元函数。
     * @param value 第一个值，可以是普通值，也可以是一个函数
     * @param args 后续跟着的一元函数
     * @returns 如果第一个是函数则返回一个函数，如果第一个是值的话则返回求解后的值
     * @example
     *
     *    pipe(3, x => x + 1, x => x * 2);
     *    // => 8
     *
     *    const fn = pipe((x, y) => x + y, x => x + 1, x => x * 2);
     *    fn(3, 4);
     *    // => 16
     */
    var pipe = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof value === 'function') {
            return function () {
                var _args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _args[_i] = arguments[_i];
                }
                return _pipe.apply(void 0, __spread([value.apply(void 0, __spread(_args))], args));
            };
        }
        return _pipe.apply(void 0, __spread([value], args));
    };

    /**
     * @class
     * @description 函子
     */
    var Functor = /** @class */ (function () {
        function Functor(value) {
            this.value = value;
        }
        Functor.prototype.map = function (func) {
            var result = func(this.value);
            return Functor.of(result);
        };
        Functor.of = function (value) {
            return new this(value);
        };
        return Functor;
    }());

    /**@class
     * @description Maybe函子
     */
    var Maybe = /** @class */ (function () {
        function Maybe(value) {
            this.value = value;
        }
        Maybe.prototype.isNothing = function () {
            return this.value === undefined
                || this.value === null;
        };
        Maybe.prototype.map = function (func) {
            return this.isNothing()
                ? Maybe.of(null)
                : Maybe.of(func(this.value));
        };
        Maybe.of = function (value) {
            return new this(value);
        };
        return Maybe;
    }());

    /**
     * @class
     * @description Ap函子
     */
    var Ap = /** @class */ (function () {
        function Ap(value) {
            this.value = value;
        }
        Ap.prototype.ap = function (f) {
            var result = pipe(f.value, this.value);
            return Ap.of(result);
            // return pipe(f.value, this.value, Ap.of);
        };
        Ap.of = function (value) {
            return new this(value);
        };
        return Ap;
    }());

    /**
     * @class
     * @description Monad函子
     */
    var Monad = /** @class */ (function () {
        function Monad(value) {
            this.value = value;
        }
        Monad.prototype.map = function (func) {
            var result = func(this.value);
            return Monad.of(result);
        };
        Monad.prototype.join = function () {
            return this.flat(this);
        };
        Monad.prototype.flat = function (functor) {
            var value = functor.value;
            return value && value.constructor === Monad
                ? this.flat(value)
                : functor;
        };
        Monad.prototype.flatMap = function (f) {
            //return this.map(f).join();
            return this.join().map(f);
        };
        Monad.of = function (value) {
            return new this(value);
        };
        return Monad;
    }());

    /**
     * @class
     * @description Either函子
     */
    var Either = /** @class */ (function () {
        function Either(left, right) {
            this.left = left;
            this.right = right;
        }
        Either.prototype.map = function (func) {
            return this.right
                ? Either.of(this.left, func(this.right))
                : Either.of(func(this.left), this.right);
        };
        Either.of = function (left, right) {
            return new this(left, right);
        };
        return Either;
    }());
    var Right = /** @class */ (function () {
        function Right(value) {
            this.value = value;
        }
        Right.prototype.map = function (func) {
            var result = func(this.value);
            return Right.of(result);
        };
        Right.of = function (value) {
            return new this(value);
        };
        return Right;
    }());

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

    console.log(shuffle([1, 6, 3, '15', 56, 'hello', false]));

}());
