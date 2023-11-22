var empty = []; // []
var primes = [2, 3, 5, 7, 11];  // [ 2, 3, 5, 7, 11 ]
var misc = [1.1, true, "a"];    // [ 1.1, true, 'a' ]

// console.log(empty);
// console.log(primes);
// console.log(misc);  

var base = 1024;
var table = [base, base + 1, base + 2, base + 3];
// console.log(table); // [ 1024, 1025, 1026, 1027 ]


var b = [[1, { x: 1, y: 2 }], [2, { x: 3, y: 4 }]];
// console.log(b); // [ [ 1, { x: 1, y: 2 } ], [ 2, { x: 3, y: 4 } ] ]

var count = [1, , 3];
var undefs = [, ,];
// console.log(count); // [ 1, <1 empty item>, 3 ]
// console.log(undefs); // [ <2 empty items> ]
// console.log(count.toString())   // 1,,3
// console.log(undefs.toString())  // ,

var a = new Array(5, 4, 3, 2, 1, "testing, testing");

var a = ["world"];
var value = a[0];
a[1] = 3.14;
var i = 2;
a[i] = 3;
a[i + 1] = "hello";
a[a[i]] = a[0];
// console.log(a); // [ 'world', 3.14, 3, 'hello', 'world' ]

var o = {}
o[1] = "one";
// console.log(o); // { '1': 'one' }


// console.log(a.length); // 5

// a.length = 4

// console.log(a)  // [ 'world', 3.14, 3, 'world' ]
// console.log(a.length); // 4

a[-1.23] = true;
a["1000"] = 0;
a[1.000] = 1;
// console.log(a); // [ 'world', 1, 3, 'world', <996 empty items>, 0, '-1.23': true ]


var a = new Array(5);
// console.log(a); // [ <5 empty items> ]
var a = [];
// console.log(a); // []
a[1000] = 0;
// console.log(a); //  [ <1000 empty items>, 0 ]


var a1 = [,];
var a2 = [undefined];
// console.log(a1.length); // [ <1 empty item> ]
// console.log(a2.length); // [ undefined ]

// console.log([].length); // 0
// console.log(["a", "b", "c"].length); // 3


// var r1 = 0 in a1;
// var r2 = 0 in a2;
// console.log(r1); // false
// console.log(r2); // false

// for (var i = 0; i < a1.length; i++) {
//     console.log(a1[i])
// };


var a = [1, 2, 3, 4, 5];
a.length = 3;
// console.log(a); // [ 1, 2, 3 ]
a.length = 0;
// console.log(a); // []
a.length = 5;
// console.log(a); // [ <5 empty items> ]


var a = [1, 2, 3];

Object.defineProperty(a, "length", { writable: false });
// a.length = 0;   // 报错：TypeError: Cannot assign to read only property 'length' of object '[object Array]'

// console.log(a.length);


var a = [];
a.push('zero');
a.push('one', 'two');
// console.log(a); // [ 'zero', 'one', 'two' ]


var a = [1, 2, 3];
delete a[1];
// console.log(1 in a);    // false
// console.log(a.length);  // 3
// console.log(a); // [ 1, <1 empty item>, 3 ]

// Object.keys()返回一个数组， 数组有对象中可枚举的自有属性的名称组成。
var o = { '1': 'one', '2': 'two', '3': 'three' };
// console.log(o); // { '1': 'one', '2': 'two', '3': 'three' }
var keys = Object.keys(o);
// console.log(keys); // [ '1', '2', '3' ]
var values = [];
for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    values[i] = o[key];
}
// console.log(values); // [one]


var table = new Array(10);
for (var i = 0; i < table.length; i++) {
    table[i] = new Array(10);
}
for (var row = 0; row < table.length; row++) {
    for (var col = 0; col < table[row].length; col++) {
        table[row][col] = row * col;
    }
}
var product = table[5][7];
// console.log(product);   // 35

var a = [1, 2, 3];
let test1 = a.join();
// console.log(test1);
let test2 = a.join(" ");
// console.log(test2);
let test3 = a.join("");
// console.log(test3);
var b = new Array(10);
let test4 = b.join('-');
// console.log(test4);

var a = [1, 2, 3];
let test5 = a.reverse().join();
// console.log(test5); // 3,2,1

var a = new Array("banana", "cherry", "apple");
a.sort();
let s = a.join(",");
// console.log(s); // apple,banana,cherry


var a = [33, 4, 1111, 222];
let test6 = a.sort();
// console.log(test6)  // [ 1111, 222, 33, 4 ]
let test7 = a.sort(function (a, b) {
    return a - b;
});
// console.log(test7)  // [ 4, 33, 222, 1111 ]
let test8 = a.sort(function (a, b) { return b - a });
// console.log(test8)  // [ 1111, 222, 33, 4 ]


var a = ["ant", "Bug", "cat", "Dog"];
// console.log(a.sort());   // [ 'Bug', 'Dog', 'ant', 'cat' ]
// console.log(a.sort(function (s, t) {
//     var a = s.toLowerCase();
//     var b = t.toLowerCase();
//     if (a < b) return -1;
//     if (a > b) return 1;
//     return 0;
// }));     // [ 'ant', 'Bug', 'cat', 'Dog' ]

var a = [1, 2, 3];
// console.log(a.concat(4, 5));    // [ 1, 2, 3, 4, 5 ]
// console.log(a.concat([4, 5]));  // [ 1, 2, 3, 4, 5 ]
var b = a.concat([4, 5], [6, 7]);
// console.log(b)
// [
//   1, 2, 3, 4,
//   5, 6, 7
// ]
// console.log(a.concat(4, [5, [6, 7]]));
// [ 1, 2, 3, 4, 5, [ 6, 7 ] ]


var a = [1, 2, 3, 4, 5];
// console.log(a.slice(0, 3)); // [ 1, 2, 3 ]
// console.log(a.slice(3));    // [ 4, 5 ]
// console.log(a.slice(1, -1));    // [ 2, 3, 4 ]
// console.log(a.slice(-3, -2));   // [ 3 ]

var a = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(a.splice(4));   // [ 5, 6, 7, 8 ]
// console.log(a.splice(1, 2));    // [ 2, 3 ]
// console.log(a.splice(1, 1));    // [ 4 ]

var a = [1, 2, 3, 4, 5];
// console.log(a.splice(2, 0, "a", "b"));  // []
// console.log(a)
// console.log(a.splice(2, 2, [1, 2], 3)); // [ 'a', 'b' ]
// console.log(a)

var stack = [];
// console.log(stack.push(1, 2));  // 返回数组长度2
// console.log(stack.pop());       // 返回删除的元素2
// console.log(stack.push(3));     // 返回数组长度2
// console.log(stack.pop());       // 返回删除的元素3
// console.log(stack.push([4, 5]));    // 返回数组长度2
// console.log(stack.pop());       // 返回删除的元素 [4, 5]
// console.log(stack.pop());       // 返回删除的元素 1

var a = [];
// console.log(a.unshift(1));   // 返回数组长度 1
// console.log(a.unshift(22));     // 返回数组长度 2
// console.log(a.shift());     // 返回删除的元素 22
// console.log(a.unshift(3, [4, 5]));  // 返回数组长度 3
// console.log(a.shift());     // 返回删除的元素 3
// console.log(a.shift());     // 返回删除的元素 [4, 5]
// console.log(a.shift());     // 返回删除的元素 1

// console.log([1, 2, 3].toString());      // 1,2,3
// console.log(["a", "b", "c"].toString());    // a,b,c
// console.log([1, [2, "c"]].toString());      // 1,2,c

var data = [1, 2, 3, 4, , undefined, 5];
var sum = 0;
data.forEach(function (value) {
    sum += value;
});
// console.log(sum)    // 15
data.forEach(function (v, i, a) {
    // forEach里面有三个参数
    // v 表示数组元素
    // i 表示元素的索引
    // a 表示数组本身
    a[i] = v + 1;
})
// console.log(data)   // [ 2, 3, 4, 5, 6 ]


function foreach(a, f, t) {
    try {
        a.forEach(f, t);
    } catch (e) {
        if (e == foreach.break) return;
        else throw e
    }
}
foreach.break = new Error("StopIteration")

a = [1, 2, 3];
b = a.map(function (x) { return x * x; });
// console.log(b)  // [ 1, 4, 9 ]

var a = [5, 4, 3, 2, 1];
var smallvalues = a.filter(function (x) {
    return x < 3
});
// console.log(smallvalues)        // [ 2, 1 ]
var everyother = a.filter(function (x, i) {
    return i % 2 == 0
})
// console.log(everyother)     // [ 5, 3, 1 ]

var array = a.filter(function (x, i, t) {
    return t.length === 5;
})
// console.log(array)  // [ 5, 4, 3, 2, 1 ]

a = a.filter(function (x) { return x !== undefined && x != null })
// console.log(a)

var a = [1, 2, 3, 4, 5];
b = a.every(function (x) {
    return x < 10;
})
// console.log(b);     // true
b = a.every(function (x) {
    return x % 2 === 0;
})
// console.log(b);     // flase


var a = [1, 2, 3, 4, 5];
b = a.some(function (x) {
    return x % 2 === 0;
})
// console.log(b);     // true
b = a.some(isNaN);
// console.log(b);     // false

var a = [1, 2, 3, 4, 5];
var sum = a.reduce(function (x, y) {
    return x + y; // 数组求和
}, 0);
// console.log(sum);   // 15

var product = a.reduce(function (x, y) {
    return x * y    // 数组求积
}, 1);
// console.log(product)    // 120

var max = a.reduce(function (x, y) {
    return (x > y) ? x : y;     // 求最大值
});
// console.log(max);   // 5

var a = [2, 3, 4];
var big = a.reduceRight(function (accumulator, value) {
    return Math.pow(value, accumulator)
})
// console.log(big);       // 2.4178516392292583e+24


function union(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
}
var objects = [{ x: 1 }, { y: 2 }, { z: 3 }];
var merged = objects.reduce(union);
// console.log(merged);

var objects = [{ x: 1, a: 1 }, { y: 2, a: 2 }, { z: 3, a: 3 }]
var leftunion = objects.reduce(union);
// console.log(leftunion)      // { x: 1, a: 3, y: 2, z: 3 }
var rightunion = objects.reduceRight(union);
// console.log(rightunion)     // { z: 3, a: 1, y: 2, x: 1 }

var a = [0, 1, 2, 1, 0];
// console.log(a.indexOf(1))       // 1
// console.log(a.lastIndexOf(1))   // 3
// console.log(a.indexOf(3))       // -1

function findall(a, x) {
    var results = [];
    var len = a.length;
    var pos = 0;
    while (pos < len) {
        pos = a.indexOf(x, pos);
        if (pos === -1) break;
        results.push(pos);
        pos = pos + 1;
    }
    return results
}

// console.log(findall(a, 1)) // [ 1, 3 ]

a = ([] instanceof Array)
// console.log(a)  // true
a = (({}) instanceof Array)
// console.log(a)  // false


var isArray = Function.isArray || function (o) {
    return typeof o === "object" &&
        Object.prototype.toString.call(o) === "[object Array]";
};
// console.log(isArray([]))

var a = {};
var i = 0;
while (i < 10) {
    a[i] = i * i;
    i++;
}
a.length = i;
var total = 0;
for (var j = 0; j < a.length; j++)
    total += a[j];
// console.log(total)      // 285

function isArrayLike(o) {
    if (o &&                    // o非null、undefined等
        typeof o === "object" &&    // o是对象
        isFinite(o.length) &&       // o.length是有限数值
        o.length >= 0 &&            // o.length为非负值
        o.length === Math.floor(o.length) &&  // o.length是整数
        o.length < 4294967296)      // o.length < 2^32
        return true;                //  o是类数组对象
    else
        return false;
}


var a = { "0": "a", "1": "b", "2": "c", length: 3 };
var b = Array.prototype.join.call(a, "+");
// console.log(b);     // a+b+c
b = Array.prototype.slice.call(a, 0);
// console.log(b);     // [ 'a', 'b', 'c' ]
b = Array.prototype.map.call(a, function (x) {
    return x.toUpperCase();
})
// console.log(b)      // [ 'A', 'B', 'C' ]

Array.join = Array.join || function (a, sep) {
    return Array.prototype.join.call(a, sep);
};

Array.slice = Array.slice || function (a, from, to) {
    return Array.prototype.join.call(a, from, to);
}

Array.map = Array.map || function (a, f, thisArg) {
    return Array.prototype.map.call(a, f, thisArg);
}


s = "test";
// console.log(s.charAt(0));   // t
// console.log(s[1]);      // e

s = "JavaScript";
b = Array.prototype.join.call(s, " ")
// console.log(b)      // J a v a S c r i p t
b = Array.prototype.filter.call(s, function (x) {
    return x.match(/[^aeiou]/);
}).join("")
// console.log(b)      // JvScrpt


