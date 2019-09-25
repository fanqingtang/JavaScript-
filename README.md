## 前言

这里实现一个原生的 `bind`方法

``` javascript
  // 实现bind方法
  Function.prototype.bind = function (context) {
    let args = Array.prototype.slice.call(arguments, 1),
        self = this;
    function Fn() {};
    let fBound = function () {
      let bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    Fn.prototype = this.prototype;
    fBound.prototype = new Fn();
    return fBound;
  }
```
  这里获取`数组`的`交集`的方法

  ``` javascript
    //获取数组得到的交集
  let a = [1,2,3,4],
      b = [2,3,4,5];
    //获取交集的第一种方法
    function intersection1 (a, b) {   
      let result = a.concat(b).sort((a, b) => a - b);
      let sameArr = result.filter((v, i) => result.indexOf(v) !== i);
      return sameArr;
    }
    intersection(a, b);    
    // 获取交集的第二种方法
    function intersection2 (a, b) {  
      let result = a.filter((v) => b.indexOf(v) > -1);
      return result;
    }

    // 获取交集的第三种方法
    function intersection (a, b) {
      let result = [];
      for (let i = 0; i < a.length; i++) {
        let current = a[i];
        if (b.indexOf(current) > -1) {
          result.push(current);
        }
      }
      for (let j = 0; j < result.length; j++) {
        if (result[j] === result[j+1]) {
          result.splice(j, 1);
          j--;
        }
      }
      return result;
    }
  ```
  这里获取`数组`的`差集`的方法

  ``` javascript
    //获取差集的第一种方法
    function different1 (a, b) {
      let arraya = a.filter(v => !b.includes(v));
      let arrayb = b.filter(v => !a.includes(v));
      let result = arraya.concat(arrayb);
      return result;
    }
    //获取差集的第二种方法
    function different2 (a, b) {
      let newA = a.sort((a, b) => a - b).filter((item, i) => a.indexOf(item) == i);
      let newB = b.sort((a, b) => a - b).filter((item, i) => b.indexOf(item) == i);
      let result = newA.concat(newB).sort(a, b => a - b);
      let diff = [];
      for (let i = 0; i < result.length; i++) {
        if (result[i] !== result[i+1]) {
          diff.push(result[i]);
        } 
        else {
          i++;
        }
      }
    }
    //获取差集的第三种方法
    function different3 (a, b) {
      let newA = [],
          newB = [];
      for (let i = 0; i < a.length; i++) {
        let currentA = a[i];
        if (b.indexOf(currentA) == -1) {
          newA.push(currentA);
        }
      }
      for (let j = 0; j < b.length; j++) {
        let currentB = b[j];
        if (a.indexOf(currentB) == -1) {
          newB.push(currentB);
        }
      }
      return newA.concat(newB);
    }

  ```
  这里获取`数组`的`并集`的方法
  ``` javascript
  // 获取数组的并集第一种方法
  function union1 (a, b) {
    let result = a.concat(b).sort((a, b) => a - b);
    return result.filter((item, index) => result.indexOf(item) === index);
  }

  // 获取数组的并集第二种方法
  function union2 (a, b) {
    let result = [...a, ...b].sort((a, b) => a - b);
    for (let i = 0; i < result.length; i++) {
      if (result[i] === result[i+1]) {
        result.splice(i, 1);
        i--;
      }
    }
    return result;
  }
  // 获取数组的并集第三种方法
  function union3 (a, b) {
    let result = [...a, ...b].sort((a, b) => a - b);
    let obj = {};
    let newArr = [];
    for (let i = 0; i < result.length; i++) {
      let current = result[i];
      if (!obj[current]) {
        newArr.push(current);
        obj[current] = 1;
      }
    }
    return newArr;
  }

  ```
  简单实现一个`深拷贝`

  ``` javascript
  function checkType (type) {   // 类型检查
    return Object.prototype.toString.call(type).slice(8, -1);
  }
  function deepClone (params) {   // 深拷贝
    let obj = null;
    if (checkType(params) === 'Object') {
      obj = {};
    }
    if (checkType(params) === 'Array') {
      obj = [];
    }
    for (let key in params) {
      if (checkType(params[key]) === 'Object' || checkType(params[key]) === 'Array') {
        obj[key] = deepClone(params[key]);
      } else {
        obj[key] = params[key]
      }
    }
    return obj;
  }

  ```
  javascript 里的循环方法: forEach, for...in, for...of;

  ``` javascript
  // forEach 循环不能用break和return 中断
  let arr = [1, 2, 3, 4];

  arr.forEach(function (val) {
    if (val === 3) {
      return;
    }
    console.log(val); // 1,2,4
  });

  // for...in 循环实际是为循环可枚举（enumerable）对象而设计的 也能循环一个数组，但是不推荐，因为数组的index为数值为指标。

  let obj = {a: 1, b:2, c:3};
  
  for (let key in obj) {
    console.log(`obj.${key}=${obj[key]}`);
  }

  for (let val in arr) {
    console.log(arr[val]);
  }

  // for...of JavaScript6里引入了一种新的循环方法，它既比传统的 for 循环简洁，同时弥补了 forEach 和 for-in 循环的短板

  // 循环数组
  for(let prop of arr) {
    console.log(prop);
  }
  // 循环对象
  let obj = {
    name: 'fqt',
    age: 27,
    address: '江西 九江'
  };

  Object.defineProperty(obj,Symbol.iterator, {
    enumberable: false,
    configurable: false,
    writable: false,
    value: function () {
      let lastIndex = -1;
      let _this = this;
      let key = Object.keys(_this);
      return {
        next: function () {
          lastIndex ++;
          return {
            value: _this[key[lastIndex]],
            done: (lastIndex+1) > key.length
          }
        }
      }
    }
  });
  for (let value of obj) {  
    console.log(value);
  }

  ```
