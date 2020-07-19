import { Functor,  Monad, clone } from '../../src/index.ts';
import getType from '../../src/_.internal/_getType.ts';

//console.log(Monad.of( Monad.of( Monad.of(3).map(x => x ** 2) ) ).join().flatMap(x => x * 2) );
//console.log('=', Monad.of(3).join());

const obj = {
  age: 148,
  arr: [0, 1, 2, {
    name: 'lily'
  }]
}
const r = clone([0, 1, [2, 3]]);

console.log( r );