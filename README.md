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
