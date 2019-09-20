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
  */

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
  console.log(intersection(a, b));
}