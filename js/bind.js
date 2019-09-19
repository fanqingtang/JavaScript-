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