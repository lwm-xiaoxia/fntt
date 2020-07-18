import { adjust } from '../../src/index';

console.log( adjust(2, value => value.toUpperCase(value), ['a', 'b', 'c', 'd']) );