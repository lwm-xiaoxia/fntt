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

    console.log( Monad.of( Monad.of( Monad.of(3).map(x => x ** 2) ) ).join().flatMap(x => x * 2) );
    //console.log('=', Monad.of(3).join());

}());
