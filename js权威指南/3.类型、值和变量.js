// console.log(({ x: 1, y: 2 }).toString())    // [object Object]

// console.log([1, 2, 3].toString())       // 1,2,3
// console.log((function (x) { f(x) }).toString())     // function (x) { f(x) }
// console.log((new Date(2022, 8, 5)).toString())      // Mon Sep 05 2022 00:00:00 GMT+0800 (中国标准时间)
// console.log(/\d+/g.toString())      // /\d+/g


// console.log([1, 2, 3].valueOf())       // [ 1, 2, 3 ]
// console.log((function (x) { f(x) }).valueOf())     // [Function (anonymous)]
// console.log((new Date(2022, 8, 5)).valueOf())      // 1662307200000
// console.log(/\d+/g.valueOf())      // /\d+/g


// console.log([0].toString()) // 0
// console.log([0].valueOf())  // [ 0 ]

// console.log(1 + [1])         // 11
// console.log(1 + 1)           // 2
// console.log(1 + '1')        // 11

// var now = new Date()
// console.log(typeof (now + 1))       // string
// console.log(typeof (now - 1))       // number
// console.log(now == now.toString())  // true
// console.log(now > (now - 1))        // true

// var i;
// var sum;

// var i, sum;


// var message = "hello";
// var i = 0, j = 0, k = 0;


// for (var i = 0; i < 10; i++) console.log(i);
// for (var i = 0, j = 10; i < 10; i++, j--) console.log(i * j);
// for (var p in o) console.log(p);


// var scope = "global";
// function checkscope() {
//     var scope = "loacal";
//     return scope;
// }
// console.log(checkscope())   // loacal

// scope = "global";
// function checkscope2() {
//     scope = "local";
//     myscope = "local";
//     return [scope, myscope];
// }

// console.log(checkscope2)

// var scope = "global scope";
// function checkscope() {
//     var scope = "local scope";
//     function nested() {
//         return scope;
//     }
//     return nested();
// }

// console.log(checkscope())       // local scope

// function test(o) {
//     var i = 0;
//     if (typeof o == "object") {
//         var j = 0;
//         for (var k = 0; k < 10; k++) {
//             console.log(k)
//         }
//         console.log(k);
//     }
//     console.log(j)
// }

// test({});

// var scope = "global";
// function f() {
//     console.log(scope)  // undefined
//     var scope = "local"
//     console.log(scope)  // local
// }

// f()


// var truevar = 1
// fakevar = 2
// this.fakevar2 = 3
// console.log(delete truevar)
// console.log(delete fakevar)
// console.log(delete this.fakevar2)

