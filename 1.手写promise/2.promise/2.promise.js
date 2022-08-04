// 链式调用应用

// promise可以解决链式调用问题 jquery .then.then
// 先通过原生看效果 -> 写原理

import { resolve } from "path";



let promise = new Promise((resolve, reject) => {
    resolve('hello')
});


promise.then(data => {
    return data;    // then方法中返回一个值(不是promise), 会把这个结果放到下一次then的成功的回调中
}).then(data => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello')
        }, 1000);
    })
}).then(data => {
    return new Promise((resolve, reject) => { // 如果返回的是一个promise 那么会采用这个promise结果
        setTimeout(() => {
            reject('world');
        }, 1000);
    })
}).then(() => {

}, err => {
    console.log(err);   // 如果在失败的函数中返回的是普通值或者成功的promise也会走到promise也会走到外层的promise()
    return undefined
}).then(() => {
    console.log('成功')
    throw new Error('失败')
}, () => {

}).then(() => { }, (err) => {
    console.log('失败')
}).catch(err => { console.log(err) }).then(() => {
    console.log('then')
})

// 什么时候走成功   then中返回的是一个普通值 或者是一个promise的时候（成功的promise）
// 什么时候走失败   返回的是一个失败的promise
// catch的特点是如果没有错误处理（一层层找）， 没有找到错误处理， 会找附近的catch， catch也是then, 遵循then的规则
// .then then 并不是跟jquery一样，返回this 。 Promsise中实现链式调用主要靠的是返回一个新的promise

let p = new Promise((resolve, reject) => {
    resolve(1)
})

let p1 = p.then(() => { })
let p2 = p1.then(() => { })
console.log(p1 === p2)


