// 什么叫高阶函数 "异步"中
// 什么叫异步 1） 执行后的函数结果不能立马获取 ajax 等待同步代码执行后 才会获取结果


// setTimeout(() => {
//     console.log('10000')
// }, 1000)

// while (true) {

// }

// node 中文件操作都是异步的
let fs = requeir('fs')  // 读写文件
// 异步的解决方案 最早就是基于回调函数的
fs.readFile('./age.txt', function (params) {

})

