import util from 'util';
import fs from 'fs'
// import { isPromise } from 'util/types';

let read = util.promisify(fs.readFile);

// all 方法  最终返回的是一个promise
// 如果全成功了，才算成功， 如果一个失败了，就失败了
function isPromise(x) {
    if (typeof x === 'object' && x !== null || typeof x == 'function') {
        if (x.then === 'function') {
            return true
        }
    }
    return false
}

Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let arr = [];
        let processData = (value, index) => {
            arr[index] = value
            if (arr.length === promises.length) {
                resolve(arr)
            }
        }
        for (let i = 0; i < promises.length; i++) {
            let currentValue = promises[i];
            if (isPromise(currentValue)) {
                currentValue.then((y) => {
                    processData(y, i)
                }, reject)
            } else {
                processData(currentValue, i)
            }
        }
    })
}


Promise.all([1, read('name.txt', 'utf8'), 2, read('./age.txt', 'utf8'), 3]).then(data => {
    console.log(data)       // 输出： [ 1, 'brooks meng', 2, '10', 3 ]
}).catch(err => {
    console.log(err)
})