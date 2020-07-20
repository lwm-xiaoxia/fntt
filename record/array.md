## 数组一级深拷贝

```javascript
const copy0 = [].concat(arr);

const copy1 = arr.slice(0);

const copy2 = [...arr];

const copy3 = Array.from(arr);
```   