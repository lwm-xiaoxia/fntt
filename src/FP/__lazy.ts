type IteratorType = Generator<number, void, unknown>;

const _range = function* (min: number, max: number) {
  for (let i = min; i < max; i++) {
    console.log('range\t', i);
    yield i;
  }
}

const _map = function* (iterator: IteratorType, func: Function) {
  for (let iter of iterator) {
    console.log('map\t', iter);
    yield( func(iter) );
  }
}

const _filter = function* (iterator: IteratorType, func: Function) {
  for (let iter of iterator) {
    console.log('filter\t', iter);
    if ( func(iter) ) yield iter;
  }
}

const _stop = function* (iterator: IteratorType, func: Function) {
  for (let iter of iterator) {
    yield iter;
    if ( func(iter) ) break;
  }
}

const _take = function* (iterator: IteratorType, num: number) {
  let count = 0;
  const _filter = function (data) {
    count ++
    return count >= num;
  }
  return _stop(iterator, _filter);
  //return _stop(iterator, () => ++index >= num);
}


class Lazy {
  private _iterator: any;
  constructor() {
    this._iterator = null;
  }

  range(min: number, max: number): Lazy {
    this._iterator = _range(min, max);
    return this;
  }

  map(func: Function): Lazy {
    this._iterator = _map(this._iterator, func);
    return this;
  }

  filter(func: Function): Lazy {
    this._iterator = _filter(this._iterator, func);
    return this;
  }

  take(num: number): Lazy {
    this._iterator = _take(this._iterator, num);
    return this;
  }

  [Symbol.iterator]() {
    return this._iterator;
  }

}

export default function() {
  return new Lazy();
}