## 前言

这里实现一个原生的 `bind`方法

``` javascript

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