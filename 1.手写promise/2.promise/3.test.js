// Promise.resolve的实现
// let p = new Promise((resolve, reject) => {
//     resolve(new Promise((resovle, reject) => {
//         setTimeout(() => {
//             resolve(100)
//         }, 1000)
//     }))
// });
import Promise from './promise.js';

Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        resolve(100)
    })
}

Promise.reject = function (value) {
    return new Promise((resolve, reject) => {
        reject(value)
    })
}

Promise.resolve(100).then(data => {
    console.log(data)
})


// Promise.resolve 和 Promise.reject 区别
// Promise.resolve这里可以接受一个promise
// Promise.reject接受promise不会有等待效果
// Promise.finally实现

// p.then(data => {
//     console.log(data)
// })
