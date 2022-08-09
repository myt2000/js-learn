// promise的周边实现
import fs from 'fs' // 读写文件
import { resolve } from 'path';
import Promise from './promise.js';

function read(...args) {
    let dfd = Promise.defer();  // 延迟对象， 可以解决promise的嵌套问题
    fs.readFile(...args, function (err, data) {
        if (err) dfd.reject(err);
        dfd.resolve(data);
    });
    return dfd.promise
}

// import promisefy from 'util'
function promisify(fn) {
    return function () {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err);
                resolve(data)
            })
        })
    }
}

let readFile = promisify(fs.readFile);

read('./name.txt', 'utf8').then(data => {
    console.log(data)
    return read(data, 'utf8')
}).then(data => {
    console.log(data);
}).catch(null, err => {
    console.log(err)
})

// 回调地狱， 用他们的结果， 作为一个对象
// 读取age和name 用他们的结果 作为一个对象

// readFile('./age.txt', 'utf8', function (error, data) {
//     renderObj['age'] = data
//     readFile('./name.txt', 'utf8', function (error, data) {
//         renderObj['name'] = data
//         console.log(renderObj)
//     })
// })