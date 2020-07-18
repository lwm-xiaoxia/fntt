import testArg from '../other/testArg';


interface SkipType {
  stop: Function;
  unStop: Function;
};

/**
 * @description 拦截浏览器后退
 * @class
 */
class Skip {
  static readonly func: Function;
  constructor(fn: Function) {
    Skip.func = fn;
  }

  private eventFunc() {
    history.pushState('forward', null, ''); // 浏览器纪录前进一次
    history.forward(); // 浏览器前进一次
    Skip.fnuc();
  }

  // 阻止跳转
  public  stop() {
    if(window.history && window.history.pushState) {
      window.addEventListener('popstate', this.eventFunc); 
      history.pushState('forward', null, ''); // 浏览器纪录前进一次
      history.forward(); // 浏览器前进一次
    } else console.error('浏览器不支持history或history.pushState');
  }

  // 取消阻止
  public unStop() {
    window.removeEventListener('popstate', this.eventFunc);
    history.back(); //  浏览器后退一次回到最初
  }
}

export default function skip(func: Function) {
  if ( !testArg([func, 'function']) ) return null;
  return new Skip(func);
}
