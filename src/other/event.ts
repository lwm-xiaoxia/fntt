export class $Event {
  // 要绑定事件的目标对象
  private _target: any;
  // 事件和对应的函数以对象的形式存起来
  private _types: Object = {};
  // 使用的哪个事件api
  private _apiType: 'addEventListener' | 'attachEvent';

  constructor(target: any) {
    if (typeof target === 'string') {
      this._target = document.querySelector(target);
    } else {
      this._target = target;
    }
  }

  /**
   * @method
   * @description 绑定事件
   * @param type 事件名
   * @param func 事件回调函数
   * @param useCapture  true - 事件句柄在捕获阶段执行,false- 默认。事件句柄在冒泡阶段执行.
   * @returns 返回整个对象以便于链式调用
   */
  public on(type: string, func: Function, useCapture: boolean = false): $Event {
    this._types[type] = func;
    if (this._target.addEventListener) {
      this._apiType = 'addEventListener';
      this._target.addEventListener(type, func, useCapture);
    }
    else if (this._target.attachEvent) {
      this._target.attachEvent('on' + type, func);
      this._apiType = 'attachEvent';
    }
    return this;
  }
  /**
   * @method
   * @description 解绑事件
   * @param type 要移除的事件名
   * @returns 返回整个对象以便于链式调用
   */
  public unbind(type: string): $Event { 
    if (this._apiType === 'addEventListener') {
      this._target.removeEventListener(type, this._types[type]);
    } else if (this._apiType === 'attachEvent') {
      this._target.detachEvent('on' + type, this._types[type]);
    }
    return this;
  }
  /**
   * @method
   * @description 绑定事件调用一次就解绑
   * @param type 事件名
   * @param func 事件回调函数
   * @param useCapture  true - 事件句柄在捕获阶段执行,false- 默认。事件句柄在冒泡阶段执行.
   * @returns 返回整个对象以便于链式调用
   */
  once(type: string, func: Function, useCapture?: boolean): $Event {
    return this.on(type, e => {
      this.unbind(type);
      func();
    }, useCapture);
  }
}

export default function $event(target: any): $Event {
  return new $Event(target);
}
