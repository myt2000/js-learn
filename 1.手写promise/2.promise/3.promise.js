// const promise = new Promise((resolve, reject) => {  // executor立刻执行
//     // 在默认等待态的时候，可以更改状态
//     resolve('成功')
//     setTimeout(() => {
//         reject()
//     }, 1000)
// })

// promise.then(() => { }, () => { })

// promise.then(() => { }, () => { })

// promise.then(() => { }).then(() => { })
import Promise from './promise.js';
// let promise2 = promise.then((data) => {
//     return 100
// })
// promise2.then((data) => { })

// 1. 每次调用then方法时 都返回一个新的promise实例

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('666')
    }, 1000)
})

let promise2 = promise.then(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve((new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('hello')
                })
            })))
        }, 1000)
    })
})

promise2.then().then().then((data) => {
    console.log('s: ' + data)
}, (err) => { console.log('err: ' + err) })


// https://github.com/promises-aplus/promises-tests  用于测试写的promise
// 可以直接安装 npm install -g promises-aplus-tests  测试之后无法使用，代码里使用了require，不支持该模式， 必须import

// 验证promise的写的对不对的测试代码
// Promise.defer = Promise.deferred = function () {
//     let dfd =
//         dfd.promise = new Promise((resolve, reject) => {
//             dfd.resolve = resolve
//             dfd.reject = reject
//         })
//     return dfd
// }
// module.exports = Promise