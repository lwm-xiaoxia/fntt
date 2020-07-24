import { shuffle, $event } from '../../src/index';
import db from '../../src/database/db';
import stotage from '../../src/database/storage';
import storage from '../../src/database/storage';



// const dababase = db('dddd', 332);
// setTimeout(() => dababase.read('persion'), 1000)

const s = storage('local');
s.set('age', '10');
s.set('name', 'lily');
s.set('city', 'fujian');
s.set('oo', 'pp');

console.log( s.has('ag') );
