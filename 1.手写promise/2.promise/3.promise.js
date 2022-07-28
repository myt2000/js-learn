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
    console.log(data);
})