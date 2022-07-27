// 什么是高阶函数
// 1. 如果一个函数的参数是一个函数（回调函数就是一种高阶函数）
// 2. 如果一个函数返回一个函数， 当前这个函数也是一个高阶函数

// 写一个业务代码，扩展当前的业务代码
function say(a, b) {
    // todo...
    console.log('say')
}

// 给某个方法，添加一个方法在他执行之前调用
Function.prototype.before = function (callback) {
    return (...args) => {  // 剩余运算符, 箭头函数没有this, 也没有arguments
        callback()
        console.log("执行回调函数")
        this(...args)

    }
}

let beforeSay = say.before(function () { console.log("before say") })

beforeSay("hello", "world")