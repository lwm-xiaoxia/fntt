import isEl from '../is/isEl';

type elmType = Element | Document | Window;
type selectorType = elmType | string;

/**
 * @class
 * @description 对于DOM的封装
 */
export class $DOM {
  // 保存节点对象
  private _elm: Object;
  //保存事件的回调函数
  private _func: Function;
  // 事件名
  private _type: string;
  constructor(elm: Object) {
    this._elm = elm;
  }
  /**
   * @method
   * @description 获取对外暴露获取dom节点的方法
   */
  public get(): Object {
    return this._elm;
  }
  /**
   * @method
   * @description 绑定事件
   * @param type 事件名
   * @param 事件回调函数
   * @returns 返回整个对象以便于链式调用
   */
  public on(type: string, func: Function): $DOM {
    this._type = type;
    this._func = func;
    if ((this._elm as any).addEventListener) {
      (this._elm as any).addEventListener(this._type, this._func, false);
    }
    else if ( (this._elm as any).attachEvent ) {
      (this._elm as any).attachEvent('on' + this._type, this._func);
    }
    return this;
  }
  /**
   * @method
   * @description 解绑事件
   * @returns 返回整个对象以便于链式调用
   */
  public unbind(): $DOM {
    (this._elm as any).removeEventListener(this._type, this._func as any);
    return this;
  }
}

export default function $dom(selector: any): $DOM[] | null {
  if (typeof selector === 'string') {
    const elms = document.querySelectorAll(selector);
    if (elms.length === 0) return null;
    return Array.from(elms).map( elm => new $DOM(elm) );
  } 
  else if ( [document, window].includes( (selector as any) ) ) {
    return [new $DOM(selector)];
  }
  else if ( isEl(selector) ) {
    return [new $DOM(selector)];
  }
  console.error('传入的选择器有误');
  return null;
}