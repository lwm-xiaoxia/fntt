import pipe from '../FP/pipe';
import { TargetType } from './type';

class Cookie {
  public set(key: string, value: string): Cookie {
    document.cookie = `${key}=${value}`;
    return this;
  }
  public get(key: string, type: TargetType = 'key'): string {
    const tp0 = type === 'key' ? 0 : type === 'value' ? 1 : -1;
    const tp1 = type === 'key' ? 1 : type === 'value' ? 0 : -1;
    return pipe(
      this.entries,
      cookieArr => cookieArr.find( cookie => cookie[tp0] === key ),
      cookie => cookie && cookie[tp1],
    )();
  }
  public has(target: string, type: TargetType = 'key'): boolean {
    const condition = {
      'key':     target => this.keys().includes(target),
      'value':   target => this.values().includes(target),
      'default': target => false,
    };
    return (condition[type] || condition['default'])(target);
  }
  // public remove(target: string, type: TargetType = 'key'): boolean {

  // }
  // public clear(): Cookie {

  // }
  public keys(): string[] {
    return pipe(
      this.entries,
      cookies => cookies.map( cookie => cookie[0] ),
    )();
  }
  public values(): string[] {
    return pipe(
      this.entries,
      cookies => cookies.map( cookie => cookie[1] ),
    )();
  }
  public entries(): Array<[string, string]> {
    const cookieStr = document.cookie;
    if (!cookieStr) return [];
    return pipe(
      cookieStr => cookieStr.split(';'),
      cookieArr => cookieArr.map( cookie => cookie.split('=') ),
    )(cookieStr);
  }
}

export default new Cookie();