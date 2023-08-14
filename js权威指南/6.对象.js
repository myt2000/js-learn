// var empty = {}
// var point = { x: 0, y: 0 }
// var point2 = { x: point.x, y: point.y + 1 }
// var book = {
//     "man title": "JavaScript",
//     "sub-title": "The Definitive Guide",
//     "for": "all audiences",
//     "author": {
//         firstname: "David",
//         surname: "Fianagan"
//     }
// };


// var o = new Object();
// var a = new Array();
// var d = new Date();
// var r = new RegExp("js");

// var o1 = Object.create({ x: 1, y: 2 });
// var o2 = Object.create(null);
// var o3 = Object.create(Object.prototype)

// console.log(o1)
// console.log(o1.x, o1.y)
// console.log(o2)
// console.log(o3)


// 模拟原型继承
function inherit(p) {
    if (p == null) throw TypeError();  // p是一个对象， 但不能是null
    if (Object.create)               // 如果Object.create()存在
        return Object.create(p);    // 直接使用它
    var t = typeof p;               // 否则进行进一步检测
    if (t !== "Object" && t !== "function") throw TypeError();
    function f() { };                //  定义一个空构造函数
    f.prototype = p;                // 将其原型属性设置为p
    return new f                    // 使用f()创建p的继承对象
}


// var a = inherit({ x: 1, y: 2 })
// var b = inherit(function () { console.log("hello") })

// console.log(a, a.x, a.y)
// console.log(b)
// b()


// var o = {}
// o.x = 1
// var p = inherit(o)
// p.y = 2
// var q = inherit(p)
// q.z = 3
// var s = q.toString();
// console.log(q.x + q.y)  // 3

// var unitcircle = { r: 1 }
// var c = inherit(unitcircle)
// c.x = 1, c.y = 1;
// c.r = 2;
// console.log(c)              // { x: 1, y: 1, r: 2 }
// console.log(unitcircle.r)   // 1

// delete book.author;
// delete book["main title"];

// let o = { x: 1 }
// let a = delete o.x;
// console.log(a)
// delete o.x;
// delete o.toString;
// delete 1;

// delete Object.prototype;
// var x = 1;
// delete this.x;
// function f() { }
// delete this.f;


// var o = { x: 1 }
// console.log("x" in o);  // true
// console.log("y" in o);  // false
// console.log("toString" in o);   // true


// console.log(o.hasOwnProperty("x"));     // true
// console.log(o.hasOwnProperty("y"));     // false
// console.log(o.hasOwnProperty("toString"));  // false



// var o = inherit({ y: 2 });
// o.x = 1;
// console.log(o);                             // { x: 1 }
// console.log(o.propertyIsEnumerable("x"));   // true
// console.log(o.propertyIsEnumerable("y"));   // false
// console.log(Object.prototype.propertyIsEnumerable("toString")); // false


// var o = { x: 1 }
// console.log(o.x !== undefined);     // true
// console.log(o.y !== undefined);     // false
// console.log(o.toString !== undefined);  // true


// 用来枚举属性的对象工具函数

/* 把o的属性复制到p属性中*/
function extend(o, p) {
    for (prop in p) {
        o[prop] = p[prop];
    }
    return o;
}

/* 去掉同名属性*/
function merge(o, p) {
    for (prop in p) {
        if (o.hasOwnProperty[prop]) continue;
        o[prop] = p[prop]
    }
    return o;
}
/* 如果o中的属性p中没有同名属性， 则从o中删除这个属性*/
function restrict(o, p) {
    for (prop in o) {
        if (!(prop in p)) delete o[prop];
    }
}
/* 如果o中的属性在p中存在同名属性， 则从o中删除这个属性*/
function substract(o, p) {
    for (prop in p) {
        delete o[prop];
    }
    return o;
}

/* 返回一个新对象，这个对象同时拥有o,p的属性*/
function union(o, p) { return extend(extend({}, o), p); }

/* 返回一个新对象，这个对象拥有同时在o,p中出现的属性*/
function intersection(o, p) {
    return restrict(extend({}, o), p);
}

/* 返回一个数组， 这个数组包含的是o中可枚举的自由属性的名字*/
function keys(o) {
    if (typeof o !== "object") throw TypeError();
    var result = [];
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) { result.push(prop) }
    }
    return result;
}


let a = { x: 1, y: 2 }
console.log(Object.keys(a));
console.log(Object.getOwnPropertyNames(a));

// var o = {
//     // 普通的数据属性
//     data_prop: value,

//     // 存取器属性是成对定义的函数
//     get access_prop() {

//     },
//     set access_prop(value) {

//     }

// }


var p = {
    // x和y是普通的可读写的数据属性
    x: 1.0,
    y: 1.0,
    // r是可读写的存取器属性，它有getter和setter。
    // 函数体结束后不要忘记带上逗号
    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newvalue) {
        var oldvalue = Math.sqrt(this.x * this.x + this.y * this.y);
        var ratio = newvalue / oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // 求取三角形与x轴的角度
    get theta() {
        return Math.atan2(this.y, this.x)
    }
}

// console.log(p.r)        // 1.4142135623730951
// console.log(p.theta)    // 0.7853981633974483
// p.r = 2
// console.log(p.r)        // 1.9999999999999998
// console.log(p.theta)    // 0.7853981633974483
// console.log(Object.keys(p))
var q = inherit(p)


// q.x = 1, q.y = 1;
// console.log(q.r)        // 1.4142135623730951
// console.log(q.theta)    // 0.7853981633974483

var serialnum = {
    // 这个数据属性包含下一个序列号
    // $符号暗示
    $n: 0,
    // 返回当前值，然后自增
    get next() {
        return this.$n++;
    },
    set next(n) {
        if (n >= this.$n) this.$n = n;
        else throw "序列号的值不能比当前值小"
    }
}


// 这个对象有一个可以返回随机数的存储器属性
// 例如，表达式"random.octet"产生一个随机数
// 每次产生的随机数都在0-255之间
var random = {
    get octet() {
        return Math.floor(Math.random() * 256)
    },
    get uint16() {
        return Math.floor(Math.random() * 65536)
    },
    get init16() {
        return Math.floor(Math.random() * 65536 - 32678)
    }
}

// console.log(random.octet)
// console.log(random.uint16)
// console.log(random.init16)


// console.log(Object.getOwnPropertyDescriptor({ x: 1 }, "x"));    // { value: 1, writable: true, enumerable: true, configurable: true }

// console.log(Object.getOwnPropertyDescriptor(random, "octet"));
/*
{
  get: [Function: get octet],
  set: undefined,
  enumerable: true,
  configurable: true
}
*/

// console.log(Object.getOwnPropertyDescriptor({}, "x"));          // undefined 
// console.log(Object.getOwnPropertyDescriptor({}, "toString"));   // undefined

var o = {};

// console.log(Object.defineProperty(o, "x", { value: 1, writable: true, enumerable: false, configurable: true }));    // {}

// console.log(o.x);               // 1
// console.log(Object.keys(o));    // []

// console.log(Object.defineProperty(o, "x", { writable: false }));    // {}

// o.x = 2 // TypeError: Cannot assign to read only property 'x' of object '#<Object>'
// console.log(o.x);   // 1


// console.log(Object.defineProperty(o, "x", { value: 2, enumerable: true }));       // { x: 2}
// console.log(o.x);       // 2

// Object.defineProperty(o, 'x', {
//     get: function () {
//         return 1;
//     }
// });
// console.log(o.x);   // 1

var p = Object.defineProperties({}, {
    x: { value: 1, writable: true, enumerable: true, configurable: true },
    y: { value: 1, writable: true, enumerable: true, configurable: true },
    z: {
        get: function () { return Math.sqrt(this.x * this.x + this.y * this.y) },
        enumerable: true,
        configurable: true
    }
})


// console.log(p);     // { x: 1, y: 1, z: [Getter] }


Object.defineProperty(Object.prototype,
    "extend",
    {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function (o) {
            var names = Object.getOwnPropertyNames(o);
            for (var i = 0; i < names.length; i++) {
                if (names[i] in this) continue;
                var desc = Object.getOwnPropertyDescriptor(o, names[i]);
                Object.defineProperty(this, names[i], desc)
            }
        }
    })


// console.log(Object.getPrototypeOf(p));  // [Object: null prototype] {}

// var p = { x: 1 }
// var o = Object.create(p)
// console.log(p.isPrototypeOf(o)) // true
// console.log(Object.prototype.isPrototypeOf(o))  // true


function classof(o) {
    if (o === null) return "Null";
    if (o === undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8, -1);  // 这里调用的是String.slice, 从第8个字符开始，到最后一个
}

// console.log(classof(null)); // Null
// console.log(classof(1));    // Number
// console.log(classof(""));   // String
// console.log(classof(false));// Boolean
// console.log(classof({}));   // Object
// console.log(classof([]));   // Array
// console.log(classof(/./));  // RegExp
// console.log(classof(new Date()));// Date
// console.log(classof(window));   // Window
// function f() { }
// console.log(classof(new f()));  // Object

// var o = Object.seal(Object.create(Object.freeze({ x: 1 }), { y: { value: 2, writable: true } }))
// console.log(o); // {}

var o = { x: 1, y: { z: [false, null, ""] } }
var s = JSON.stringify(o)
var p = JSON.parse(s)

// console.log(s);
// console.log(p);


// var s = { x: 1, y: 1 }.toString();
// console.log(s); // [object Object]

var date = new Date();
console.log(date.toString()); // Sun Feb 14 2021 17:34:40 GMT+0800 (中国标准时间
console.log(date.toLocaleString());  // 2023/8/14 下午3:31:34
console.log(date.toJSON());  // 2023-08-14T07:36:12.484Z
console.log(date.valueOf());  // 1613316692484

