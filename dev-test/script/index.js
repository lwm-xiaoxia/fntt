import { Functor,  Monad } from '../../src/index.ts';

console.log( Monad.of( Monad.of( Monad.of(3).map(x => x ** 2) ) ).join().flatMap(x => x * 2) );
//console.log('=', Monad.of(3).join());