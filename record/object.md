## 合并对象

```javascript

const target = { age: 18, name: 'lily' };
const add = { age: 15, city: 'fuzhou' };
// 下面两个等价
const obj0 = Object.assign(target, add);
const obj1 = {
  ...target,
  ...add,
};

```