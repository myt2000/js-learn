// 函数柯里化，函数反柯里化

// 判断变量的类型
// 常用的判断类型的方法有四种：
// 1. typeof 不能判断对象类型 typeof []  typeof {}
// 2. constructor 可以找到这个变量是通过谁构造出来的
// 3. instanceof 判断谁是谁的实例 __proto__
// 4. Object.prototype.toString.call() 缺陷就是不能细分是谁谁的实例


function isType(type, value) {
    return Object.prototype.toString.call(value) === `[object ${type}]`
}
// 将方法细分 isType => isString, isArray
// function isType(type) {
//     return function (value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`
//     }
// }
// console.log(isType([], 'Array'))

// let isArray = isType("Array")
// console.log(isArray('hello'))


// 通过一个柯里化函数 实现通用的柯里化方法
// 这个函数存在问题，因为传入的参数都会被放入数组
// const currying = (fn, arr = []) => {
//     let len = fn.length;  // 这里获取的是函数的参数个数
//     return function (...args) { // 高阶函数
//         arr = [...arr, ...args]
//         if (arr.length < len) {
//             return currying(fn, arr)    // 递归不停的产生函数
//         } else {
//             return fn(...arr)
//         }
//     }
// }

// let isArray = currying(isType)('Array')
// let isString = currying(isType)('isString')


// console.log(isArray([]))
// console.log(isArray('123'))
// console.log(isString('abc'))


// function sum(a, b, c, d, e, f) {
//     return a + b + c + d + e + f
// }

// let r = currying(sum)(1, 2)(3, 4)(5)(6)


// console.log(typeof 6 === 'number')



const currying = (fn, args = []) => {
    let len = fn.length;
    return (..._) => {
        let arg = args.concat(_);
        if (arg.length < len) {
            return currying(fn, arg);
        }
        return fn(...arg);
    }
}


const types = ['String', 'Number', 'Boolean'];
let utils = {}
types.forEach(type => {
    utils[`is${type}`] = currying(isType)(type);
})

console.log(utils.isString('hello'))


// 对某些函数进行扩展 面向切片发展

function say(who) {
    console.log('say', who)
}
// 在说话之前， 去干一些事 在说话之前先刷牙
Function.prototype.before = function (callback) { // 统一扩展了公共方法
    // 箭头函数中没有this 没有arguments
    return (...args) => { // newSay 箭头函数中没有this指向 会向上级作用域查找
        callback()
        // 展开运算符 可以将数组展开依次传入
        this(...args)  // this指向怎么看，就是谁调用这个方法 this就是谁 这里指向callback的this
    }
}

let newSay = say.before(function () {
    console.log('刷牙')
})

newSay('我')  // 什么都没加，this调用的window



