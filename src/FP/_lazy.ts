type IteratorType = Generator<number, void, unknown>;

const _range = function* (min: number, max: number) {
  for(let i = min; i < max; i++) {
    console.log('range\t', i);
    yield i;
  }
}

const _map = function* (iterator: IteratorType, func: Function) {
  for(const iter of iterator) {
    console.log('map\t', iter);
    yield( func(iter) );
  }
}

const _filter = function* (iterator: IteratorType, func: Function) {
  for(const iter of iterator) {
    console.log('filter\t', iter);
    if ( func(iter) ) yield iter;
  }
}

const _stop = function*(iterator: IteratorType, func: Function) {
  for(const iter of iterator) {
    yield iter;
    if ( func(iter) ) break;
  }
}

const _take = function (iterator: IteratorType, num: number) {
 let index = 0;
  return _stop(iterator, () => ++index >= num);
}


class Lazy{
  iterator: any;
  // constructor() {
  //   this.iterator = null;
  // }

  range(min: number, max: number): Lazy {
    this.iterator = _range(min, max);
    return this;
  }

  map(func: Function): Lazy {
    this.iterator = _map(this.iterator, func);
    return this;
  }

  filter(func: Function): Lazy {
    this.iterator = _filter(this.iterator, func);
    return this;
  }

  take(num: number): Lazy {
    this.iterator = _take(this.iterator, num);
    return this;
  }

  [Symbol.iterator]() {
    return this.iterator;
  }

}

export default function lazy () {
  return new Lazy();
}