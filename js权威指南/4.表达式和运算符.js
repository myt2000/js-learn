// console.log(-'1')        // -1

// console.log(0x1234 & 0x00ff)    // 52


// console.log(7 >> 1) // 3

// console.log(-7 >> 1)    // -4


// var point = { x: 1, y: 1 }
// console.log("x" in point)       // true
// console.log("z" in point)       // false
// console.log("toString" in point)    // true


// var data = [7, 8, 9]
// console.log("0" in data)    // true
// console.log(1 in data)      // true
// console.log(3 in data)      // false

// var d = new Date();
// console.log(d instanceof Date)      // true
// console.log(d instanceof Object)    // true
// console.log(d instanceof Number)    // false
// var a = [1, 2, 3]
// console.log(a instanceof Array)     // true
// console.log(a instanceof Object)    // true
// console.log(a instanceof RegExp)    // false

// var geval = eval;
// var x = "global", y = "global";
// console.log(y)
// function f() {
//     var x = "local";
//     eval("x += 'changed';");
//     return x;
// }

// function g() {
//     var y = "local";
//     console.log(y)
//     geval("y += 'changed';");
//     return y;
// }

// console.log(f(), x);        // local changed global
// console.log(g(), y);        // undefined:1  y += 'changed';

// var a = 1
// console.log(void a);        // undefined

var x = { a: 1, b: 2 }
for (let i in x) {
    console.log(i)  // a b
}

var y = [1, 2, 3]
for (let i in y) {
    debugger;
    console.log(i)  // 0 1 2
}