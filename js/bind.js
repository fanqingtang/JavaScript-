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