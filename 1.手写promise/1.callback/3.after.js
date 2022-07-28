// 什么叫高阶函数 "异步"中
// 什么叫异步 1） 执行后的函数结果不能立马获取 ajax 等待同步代码执行后 才会获取结果


// setTimeout(() => {
//     console.log('10000')
// }, 1000)

// while (true) {

// }

// node 中文件操作都是异步的
import { readFile } from 'fs'  // 读写文件
// 异步的解决方案 最早就是基于回调函数的, 不能使用try catch 来解决不异常
// node中回调函数的第一个参数，永远是error
// readFile('./age.txt', 'utf8',function (error, data) {
//     console.log(data)
// })

// readFile('./name.txt', 'utf8', function(error, data){
//     console.log(data)
// })

// 回调地狱， 用他们的结果， 作为一个对象
// 读取age和name 用他们的结果 作为一个对象

// readFile('./age.txt', 'utf8',function (error, data) {
//     renderObj['age'] = data
//     readFile('./name.txt', 'utf8', function(error, data){
//         renderObj['name'] = data
//         console.log(renderObj)
//     })
// })

// 基于回调的方式来获取最终结果
function after(times, callback){
    // times 会保存在当前的执行上下文中
    let renderObj = {}
    return function(key, value) {
        renderObj[key] = value
        if(--times === 0) { // times 永远取的是外层作用域下的变量
            callback(renderObj)
        }
    }
}

let out = after(2, function(renderObj){
    console.log(renderObj)
})

readFile('./age.txt', 'utf8',function (error, data) {
    // renderObj['age'] = data
    out('age', data) 
})

readFile('./name.txt', 'utf8', function(error, data){
    // renderObj['name'] = data
    out('name', data)
})