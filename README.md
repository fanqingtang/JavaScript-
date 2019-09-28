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
  javascript `事件委托`
  ``` javascript
  // 假如有如下列表需要帮每个li都绑定事件
  <ul id='todo-list'>
    <li>列表一</li>
    <li>列表二</li>
    <li>列表三</li>
    <li>列表四</li>
    <li>列表五</li>
    <li>列表六</li>
  </ul>

  document.addEventListener('DOMContentLoaded', function() {
    let todoList = document.getElementById('todo-list');
    todoList.addEventListener('click', function(e){
        let event = e || window.event;   // window.event 是兼容ie浏览器
        let target = event.target || event.srcElement  // event.srcElement 是兼容ie浏览器
        if (target.nodeName.toLowerCase() === 'li') {
          console.log(target);
        }
    });
  })

  ```
  `闭包`
  ``` javaScript
  // 3s之后打印每个列表的索引
  let arr = [1,2,3,4,5,6];

  for (var i = 0; i < arr.length; i++) {
    setTimeout(function () {
      console.log(`索引值为: ${i}`);  // 最后打印索引值为 6 个 6
    }, 3000)
  }
  //原因是因为setTimeout 函数创建了一个可以访问其外部作业域的闭包，该作用域是包含索引 i 的循环。经过 3 秒后，执行该函数并打印出 i 的值，该值再循环结束时为 6。并且循环最终停止在 6 。

  // 正确的解这道题 1
  for (let i = 0; i < arr.length; i++) {
    setTimeout(function () {
      console.log(`索引值为: ${i}`);  // 最后打印索引值为 0, 1, 2, 3, 4, 5, 6
    }, 3000)
  }

  // 正确的解这道题 2
  for (var i = 0; i < arr.length; i++) {
    setTimeout(function (i) {
      console.log(`索引值为: ${i}`);  // 最后打印索引值为 0 ,1, 2, 3, 4, 5, 6
    }.bind(window, i), 3000)
  }
  // 正确的解这道题 3
  for (var i = 0; i < arr.length; i++) {
    (function (i) {
      setTimeout(function () {
        console.log(`索引值为: ${i}`); // 最后打印索引值为 0 ,1, 2, 3, 4, 5, 6
      },3000);
    })(i)
  }
  ```
  事件的`防抖（debounce）`与 `节流（throttle）`

  ``` javascript
  function throttle (fn, interval) { // 节流
    let last = 0;  // last 为上一次触发的回调时间
    return function () {  // 将throttle的处理结果当函数返回
      // 保留调用时this 上下文
      let context = this;
      //  保留调用时传的参数
      let args = arguments;
      // 记录本次触发的回调时间
      let now = new Date().getTime();
      // 判断本次触发的时间和上次触发的时间差是否大于等于时间间隔阔值
      if (now - last >= interval) {
        // 如果本次触发的时间和上次触发的时间间隔大于等于时间间隔阔值就触发回调方法
        last = now;
        fn.apply(context, args)
      }
    }
  }

  function debounce (fn, delay) { // 防抖
    let timer = null; // 定时器
    return function () { // 将debounce的处理结果当函数返回
      let context = this; // 保留调用时 this 上下文
      let args = arguments; // 保留调用时传的参数
      if (timer) {  // 每次事件被触发时，都去清除之前的旧定时器
        clearTimeout(timer);
      }
      timer = setTimeout(function () {  // 开一个新的定时器
        fn.apply(context, args);
      }, delay)
    }

  }


  function finalThrottle (fn, delay) {  // 节流和防抖相结合
    // last 为上一次触发回调的时间，timer是定时器
    let last = 0, timer = null;
    // 将throttle处理结果当作函数返回
    return function () {
      // 保留调用时的this上下文
      let context = this;
       // 保留调用时传入的参数
      let args = arguments;
      // 记录本次触发的回调时间
      let now = + new Date();
      // 判断上次触发的时间和本次触发的时间差是否小于时间间隔阔值
      if (now - last < delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, delay)
      } else { // 如果时间间隔超出了我们设定的时间间隔阔值，那就不等了，无论如何要反馈给用户一次响应
        last = now;
        fn.apply(context, args);
      }
    }
  }
  const better_scroll = finalThrottle(()=> console.log(`触发了滚动事件`), 5000);
  document.addEventListener('scroll', better_scroll);

  ```
  数组的 `冒泡排序，快速排序，选择排序，插入排序`

  ``` javascript
  // 冒泡排序
  let arr = [1,2,3,2,6,7,4,3,6,5,4,3,2,67];
  function bubbling (arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 -i; j++) {
        if (arr[j] > arr[j+1]) {
          let temp = arr[j+1];
          arr[j+1] = arr[j];
          arr[j] = temp;


        }
      }
    }
    return arr;
  }
  // 快速排序
  function fast (arr) {
    if (arr.length < 1) { return arr}
    let index = parseInt(arr.length / 2);
    let middle = arr[index];
    let left = [];
    let right = [];
    for (let i = 0; i < arr.length; i++) {
      if (middle === arr[i]) {
        continue;
      }
      if (middle < arr[i]) {
        left.push(arr[i]);
      }
      if (middle > arr[i]) {
        right.push(arr[i]);
      }
    }
    return fast(left).concat(middle, fast(right));
  }

  // 选择排序
  function selectSort (arr) {
    for (let i = 0; i < arr.length; i++) {
      let min = arr[i];  //默认最小值
      let index = i;    // 默认最小索引
      for (let j = i+1; j < arr.length; j++) {
        if (min > arr[j]) {
          index = j;
          min = arr[index];
        }
      }
      let tmp = arr[i];
      arr[i] = arr[index];
      arr[index] = tmp;
    }
    return arr;
  }

  // 插入排序

  function insertSort (arr) {
    for (let i = 0; i < arr.length; i++) {
      let j = i;
      let tmp = arr[i];
      while ( j > 0 && arr[j-1] > tmp) {
        arr[j] = arr[j-1];
        j--;
      }
      arr[j] = tmp;
    }
    return arr;
  }

  ```
  数组 `扁平化`

  ``` javascript
  // 数组扁平化方法1
  function flat (arr) {
    let tmp = [];
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        tmp = tmp.flat(arr[i]);
      } else {
        tmp.push(arr[i]);
      }
    }
    return tmp;
  }

  // 数组扁平化方法2
  function flat2 (arr) {
    return arr.reduce(function(prev, next) {
      return prev.concat(Array.isArray(next) ? flat2(next) : next);
    },[])
  }
  // 数组扁平化方法3

  function flat3 (arr) {
    return arr.flat(Infinity);
  }


  ```
