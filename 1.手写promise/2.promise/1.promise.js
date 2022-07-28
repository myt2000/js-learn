// promise https://promisesaplus.com
// 目前低版本浏览器 ， ie 不支持， 需要polyfill es6-promise(这个包实现了promise)

// 高版本都支持promise

// 1. Promise 是一个类 天生的， 勒种需要传入一个excuter 执行器， 默认会立即执行

// 2. Promise 内部会提供两个方法， 可以更改promise 的状态： 等待态  成功态  失败态
// resolve 触发成功（成功的内容） reject 触发失败 （失败的原因） undefined
// 如果一旦promise成功了就不能失败, 失败的情况 reject、 抛出异常

// promise 是为了解决异步问题的 恶魔金字塔 并发异步编程

// 有可能别人写promise是一个函数
// function Promise() {
//     return function (params) {

//     }
// }
// let p = new Promise()
// console.log(p);  // 打印输出 [Function (anonymous)]
import Promise from './promise.js';
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('xxx')
    }, 1000)
    // resolve('xxx')
    // throw new Error('错误');
    // resolve('val');
})
// 发布订阅模式  支持一个promise可以then多次， 等会改变状态后会让then
promise.then((data) => { // onfulfilled 成功
    console.log('res', data);
}, (err) => {  // onrejected 失败
    console.log(err);
});