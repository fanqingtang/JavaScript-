{
  // bind 方法的实现
  let obj = {
    name: 'fqt',
    age: 20
  };
  
  Function.prototype.bind = function (context) {
    let args = Array.prototype.slice.call(arguments, 1);
    let self = this;
    function Fn () {} //定义一个空函数用来继承原型上的方法
  
    let fBound =  function () {
      let bindArgs = Array.prototype.slice.call(arguments);
      return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
    }
    Fn.prototype = this.prototype;
    fBound.prototype = new Fn();
    return fBound;
  }
  
  function demo (adress, phone) {
    return this.name + adress+phone;
  }
  
  let adress = ' from 江西九江';
  let phone = '13632444442';
  let name = demo.bind(obj, adress);
  let instance = new name();
  // console.log(name(phone));
}
{
  // 获得数组的 交集、并集、差集 的实现方法
  let a = [1,2,3,4,4],
      b = [2,3,4,5];
  /**    
    获取交集的第一种方法
    function intersection (a, b) {   
      let result = a.concat(b).sort((a, b) => a - b);
      let sameArr = result.filter((v, i) => result.indexOf(v) !== i);
      console.log(sameArr);
    }
    intersection(a, b);
  */

  /** 
   * 获取交集的第二种方法
  function intersection (a, b) {  
    let result = a.filter((v) => b.indexOf(v) > -1);
    return result;
  }
  console.log(intersection(a, b));

    获取交集的第三种方法
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
  */
  /***
   * 获取差集方法1
    function different (a, b) {
      let arraya = a.filter(v => !b.includes(v));
      let arrayb = b.filter(v => !a.includes(v));
      let result = arraya.concat(arrayb);
      return result;
    }
    console.log(different(a, b));

    获取差集方法2
    function different (a, b) {
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
      console.log(diff);
    }
    different(a, b);
   * 
   */
  // 获取差集方法3
  function different (a, b) {
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
  console.log(different(a, b));

  // 获取数组的并集方法1
  function union1 (a, b) {
    let result = a.concat(b).sort((a, b) => a - b);
    return result.filter((item, index) => result.indexOf(item) === index);
  }
  console.log(union1(a, b));

  // 获取数组的并集方法2
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
  console.log(union2(a, b));
  // 获取数组的并集方法3
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
  console.log(union3(a, b));
}

{
  // 写一个简单的深拷贝
  let objDemo = {
    name: 'fqt',
    age: 27,
    adress: '江西九江',
    hobby: ['book','basketball',[1,2,3,4,5]],
    eat: function () {
      console.log('爱吃肉');
    }
  }
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
  console.log(deepClone(objDemo));
}
{
  let arr = [1, 2, 3, 4, 5];  // for of 循环数组
  let obj = {
    name: 'fqt',
    age: 27,
    address: '江西 九江'
  };
  Object.defineProperty(obj,Symbol.iterator,{
    enumberable:false,
    configurable:false,
    writable:false,
    value:function(){
      var _this=this;
      var nowIndex=-1;
      var key=Object.keys(_this);
      return {
        next:function(){
          nowIndex++;
          return {
            value:_this[key[nowIndex]],
            done:(nowIndex+1>key.length)
          }
        }
      }
    }
  })

  for (let value of obj) {  
    console.log(value);
  }
}

{
  let arr = [1, 2, 3, 4, 5];   // forEach 不能中断循环

  arr.forEach(function (value) {
    if (value === 3) {
      return;
    }
    console.log(value);
  });

  // for...in 循环实际是为循环可枚举（enumerable）对象而设计的

  let obj = {a: 1, b: 2, c: 3};

  for (let prop in obj) {
    console.log(`obj.${prop}=${obj[prop]}`);
  }

  // for...of 循环  JavaScript6里引入了一种新的循环方法，它就是 for...of 循环，它既比传统的 for 循环简洁，同时弥补了 forEach 和 for-in 循环的短板

  for (let val of arr) {
    console.log(val);
  }

}

{
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
}