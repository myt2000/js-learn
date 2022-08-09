// 1. Promise 是一个类 天生的， 勒种需要传入一个excuter 执行器， 默认会立即执行

// 2. Promise 内部会提供两个方法， 可以更改promise 的状态： 等待态  成功态  失败态
// resolve 触发成功（成功的内容） reject 触发失败 （失败的原因） undefined
// 如果一旦promise成功了就不能失败, 失败的情况 reject、 抛出异常

// 每个promise 实例都要有一个then方法， 分别是成功的回调和失败的回调
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECT = 'REJECT';

// resolvePromise(promise2, x, resolve, reject)
// 判断x的状态，是让promise2变成成功态还是失败态
function resolvePromise(promise2, x, resolve, reject) {
    // 此方法 为了兼容所有的promise, n个库中间 执行的流程是一样的
    // 1. 不能引用同一个对象 可能造成死循环
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise> --'))
    }
    // 2. 判断x的类型 x 如果是对象或者函数 说明他有可能是一个promise
    let called = false;
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        // 有可能是promise promise要有then方法
        try {
            let then = x.then // {a:1} 因为then的方法 可能使用的getter来定义
            if (typeof then === 'function') {   // 只能认为他是promise了
                // call改变this指向，并且让函数执行

                then.call(x, (y) => { // 只取一次， 当前promise解析出来的结果可能还是一个promise解析知道他是一个普通值为止
                    // 递归解析
                    if (called) return;
                    called = true
                    resolve(y)
                }, (r) => {
                    if (called) return;
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (error) { // 取then出错了，在错误中又掉了promise的成功
            if (called) return
            called = true
            reject(error)
        }

    } else {
        resolve(x)
    }
}

class Promise {
    constructor(executor) {         // 宏变量
        this.status = PENDING;      // 默认是等待态
        this.value = undefined;     // 成功的原因
        this.reason = undefined;    // 失败的原因
        // 专门存放成功的回调的函数
        this.onResolvedCallbacks = []
        // 专门存放失败的回调的函数
        this.onRejectCallbacks = []

        // 保证只有等待态的时候才能更改状态
        let resolve = (value) => {
            if (value instanceof Promise) {
                value.then((value) => {
                    resolve(value)
                }, reject)
                return
            }
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => {
                    fn();
                });
            }
        };
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECT;
                this.onRejectCallbacks.forEach(fn => {
                    fn();
                });
            }
        };
        // 执行 executor 传入成功和失败
        try {
            executor(resolve, reject);  // 立即执行
        } catch (e) {
            console.log('catch', e);
            reject(e);  // 如果内部出错直接err手动调用reject
            // 方法向下传递
        }
    };
    catch(errCallback) {    // 没有成功的then方法
        return this.then(null, errCallback)
    }
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : v => v;
        onrejected = typeof onrejected == 'function' ? onrejected : e => { throw err }
        // 为了实现链式调用 就创建一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                // 执行then中的方法可能是普通值或者promise 要判断x是不是一个promise 如果是promise的话 需要让这个promise执行，并且采用他的状态，作为promise 的成功或者失败
                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) { // 一旦执行then方法报错 就走到外层是then的错误处理中，调用promise2的reject方法
                        reject(error)
                    }
                }, 0);



            }
            if (this.status === REJECT) {
                setTimeout(() => {
                    try {
                        let x = onrejected(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                }, 0);


            }
            if (this.status === PENDING) {
                setTimeout(() => {
                    this.onResolvedCallbacks.push(() => {
                        // TODO... 切片编程
                        try {
                            let x = onfulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    });
                }, 0);

                this.onRejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            onrejected(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    }, 0);
                })
            }
        })

        return promise2 //返回这个promise
    }
};

new Promise((resolve, reject) => {
    let condition = false;
    if (condition) {
        resolve('data')
    } else {
        reject('error')
    }
});
Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
export default Promise;


// then方法的原理
// let obj = {
//     then() {

//     }
// }
// let fn = obj.then;
// fn.call(obj)
// obj.then(obj)

