// 函数柯里化，函数反柯里化

// 判断变量的类型
// 常用的判断类型的方法有四种：
// 1. typeof 不能判断对象类型 typeof []  typeof {}
// 2. constructor 可以找到这个变量是通过谁构造出来的
// 3. instanceof 判断谁是谁的实例 __proto__
// 4. Object.prototype.toString.call() 缺陷就是不能细分是谁谁的实例


// function isType(value, type) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`
// }
// 将方法细分 isType => isString, isArray
function isType(type) {
    return function (value) {
        return Object.prototype.toString.call(value) === `[object ${type}]`
    }
}
// console.log(isType([], 'Array'))

// 通过一个柯里化函数 实现通用的柯里化方法

let isArray = isType("Array")
console.log(isArray('hello'))
console.log(isArray([]))
