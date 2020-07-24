import { StorageType, TargetType } from './type';

class Storage {
  private static _localInstance: Storage;
  private static _sessionInstance: Storage;
  private _storage: any;

  constructor(type: StorageType) {
    this._storage = this._getApi(type);
  }

  // 单例模式，new一个对象实例
  public static creat(type: StorageType): Storage {
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
  }
  // 
  private _getApi(type: StorageType) {
    return {
      'local': window.localStorage,
      'session': window.sessionStorage,
    }[type];
  }
  // 通过key获取value
  public get(key: string): string {
    return this._storage.getItem(key);
  }
  public set(key: string, value: string): Storage {
    this._storage.setItem(key, value);
    return this;
  }
  private _each(patt: Function,func: Function,  storage) {
    const length = storage.length;
    let index = -1;
    let result;
    while (++index < length) {
      const key = storage.key(index);
      const value = storage.getItem(key);
      if ( patt(value, key) ) {
        result = [value, key];
        break;
      }
    }
    return func(...result);
  }
  public has(target: string, type: TargetType = 'key'): boolean {
    const some = (patt: Function): boolean => {
      return this._each(patt, value => true, this._storage);
    }
    
    const condition = {
      'key':     target => some( (value, key) => target === key ),
      'value':   target => some( value => target === value ),
      'default': target => false,
    };
    return (condition[type] || condition['default'])(target);
  }
  public remove(target: string, type: TargetType = 'key'): boolean {
    const find = (patt: Function) => {
      return this._each(patt, value => value, this._storage);
    };
    const condition = {
      'key':     target => this._storage.removeItem(target),
      'value':   target => find(value => target === value),
      'default': target => false,
    };
    return (condition[type] || condition['default'])(target);
  }
  public clear() {
    return this._storage.clear();
  }
  public keys(): string[] {
    const length = this._storage.length;
    let index = -1;
    let result = [];
    while (++index < length) {
      result.push( this._storage.key(index) );
    }
    return result;
  }
  public values(): string[] {
    return this.keys()
    .map( key => this._storage.getItem(key) );
  }
  public entries(): Array<[string, string]> {
    return this.keys()
    .map(key => [key, this._storage.getItem(key)])
  }
}

export default function storage (storageType: StorageType): Storage {
  return Storage.creat(storageType);
};