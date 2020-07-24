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

    var Storage = /** @class */ (function () {
        function Storage(type) {
            this._storage = this._getApi(type);
        }
        // 单例模式，new一个对象实例
        Storage.creat = function (type) {
            if (type === 'local') {
                this._localInstance = !!this._localInstance
                    ? this._localInstance
                    : new this(type);
                return this._localInstance;
            }
            else if (type === 'session') {
                this._sessionInstance = !!this._sessionInstance
                    ? this._sessionInstance
                    : new this(type);
                return this._sessionInstance;
            }
        };
        // 
        Storage.prototype._getApi = function (type) {
            return {
                'local': window.localStorage,
                'session': window.sessionStorage,
            }[type];
        };
        // 通过key获取value
        Storage.prototype.get = function (key) {
            return this._storage.getItem(key);
        };
        Storage.prototype.set = function (key, value) {
            this._storage.setItem(key, value);
            return this;
        };
        Storage.prototype._each = function (patt, func, storage) {
            var length = storage.length;
            var index = -1;
            var result;
            while (++index < length) {
                var key = storage.key(index);
                var value = storage.getItem(key);
                if (patt(value, key)) {
                    result = [value, key];
                    break;
                }
            }
            return func.apply(void 0, __spread(result));
        };
        Storage.prototype.has = function (target, type) {
            var _this = this;
            if (type === void 0) { type = 'key'; }
            var some = function (patt) {
                return _this._each(patt, function (value) { return true; }, _this._storage);
            };
            var condition = {
                'key': function (target) { return some(function (value, key) { return target === key; }); },
                'value': function (target) { return some(function (value) { return target === value; }); },
                'default': function (target) { return false; },
            };
            return (condition[type] || condition['default'])(target);
        };
        Storage.prototype.remove = function (target, type) {
            var _this = this;
            if (type === void 0) { type = 'key'; }
            var find = function (patt) {
                return _this._each(patt, function (value) { return value; }, _this._storage);
            };
            var condition = {
                'key': function (target) { return _this._storage.removeItem(target); },
                'value': function (target) { return find(function (value) { return target === value; }); },
                'default': function (target) { return false; },
            };
            return (condition[type] || condition['default'])(target);
        };
        Storage.prototype.clear = function () {
            return this._storage.clear();
        };
        Storage.prototype.keys = function () {
            var length = this._storage.length;
            var index = -1;
            var result = [];
            while (++index < length) {
                result.push(this._storage.key(index));
            }
            return result;
        };
        Storage.prototype.values = function () {
            var _this = this;
            return this.keys()
                .map(function (key) { return _this._storage.getItem(key); });
        };
        Storage.prototype.entries = function () {
            var _this = this;
            return this.keys()
                .map(function (key) { return [key, _this._storage.getItem(key)]; });
        };
        return Storage;
    }());
    function storage(storageType) {
        return Storage.creat(storageType);
    }

    // const dababase = db('dddd', 332);
    // setTimeout(() => dababase.read('persion'), 1000)
    var s = storage('local');
    s.set('age', '10');
    s.set('name', 'lily');
    s.set('city', 'fujian');
    s.set('oo', 'pp');
    console.log(s.has('ag'));

}());
