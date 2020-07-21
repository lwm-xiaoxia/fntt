## ES2020 系列：空值合并运算符 '??'

```javascript

const a = null;
const b = 8;
// a不是null或undefined时结果去a，不然取b。下面两个等价
const judge1 = (a !== undefined && a !== null) ? a : b;
const judge2 = a ?? b;

```