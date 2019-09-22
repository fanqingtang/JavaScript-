{
  // bind 方法的实现

  let obj = {
    name: 'fqt',
    age: 20
  };
  
  Function.prototype.bind = function (context) {
    let args = Array.prototype.slice.call(arguments, 1);
    let self = this;
    function Fn () {}
  
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
  //数组求交集、并集、差集
  let a = [1,2,3,3],
      b = [2,3,4,4];
  function toggle (a, b) {  //交集
    let arr = [];
    let obj = {};
    for (let i = 0; i < a.length; i++) {
      let current = a[i];
      if (b.indexOf(current) !== -1) {
        obj[current] = 1;
      }
    }
    for (let key in obj) {
      arr.push(Number(key));
    }
    return arr;
  }    
  // console.log(toggle(a, b));

  function reduce (a, b) { //差集
    let arr = a.filter((v) => b.indexOf(v) === -1);
    let brr = b.filter((v) => a.indexOf(v) === -1);
    return arr.concat(brr);

  }
  console.log(reduce(a,b));
}

{
  //交集
  let a = [1,2,3,3],
      b = [2,3,4,4];
  let sameValue = a.filter((v) => b.indexOf(v) > -1);
  console.log(sameValue);

}
{
  /**
   *   一.javascript 有七种内置类型
        1.空值(null);
        2.未定义(undefined);
        3.布尔值(boolean);
        4.数字(number);
        5.字符串(string);
        6.对象(object);
        7.符号(symbol ES6新增);

        1.我们可以用typeof运算符来查看值得类型，他返回的是类型的字符串值。
   * 
   */

    console.log(typeof undefined);  //'undefined'
    console.log(typeof null);       // 'object   
    console.log(typeof true);       // 'boolean'
    console.log(typeof '123');      // 'string'
    console.log(typeof 123);        // 'number'
    console.log(typeof {});         // 'object'  
    console.log(typeof Symbol());   //  'symbol'
    console.log(typeof function a() {}); // 'function'
    /***
     * 1.这样看来，function(函数)也是Javascript的一个内置类型。然而差阅规范就会知道，它实际上是object的一个"字类型"。具体来说
     * 函数是"可调用对象"，它有一个内部属性[[call]],该属性使其可以被调用。
     * 2.函数不仅是对象，还可以拥有属性。例如
     *  function a(b, c) {}
        console.log(a.length);  //2
       3.函数对象的length属性是其声明的参数的个数，因为该函数声明了两个命名参数，a和c，所以其length值为2 
       4. typeof [1,2,3]  //'object' 数组也是对象。确切地说，它也是object的一个"子类型"
     * 
     */


}