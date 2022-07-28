// 1. Promise 是一个类 天生的， 勒种需要传入一个excuter 执行器， 默认会立即执行

// 2. Promise 内部会提供两个方法， 可以更改promise 的状态： 等待态  成功态  失败态
// resolve 触发成功（成功的内容） reject 触发失败 （失败的原因） undefined
// 如果一旦promise成功了就不能失败, 失败的情况 reject、 抛出异常

// 每个promise 实例都要有一个then方法， 分别是成功的回调和失败的回调
const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECT = 'REJECT';

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
    then(onfulfilled, onrejected) {
        if (this.status === RESOLVED) {
            onfulfilled(this.value)
        }
        if (this.status === REJECT) {
            onrejected(this.value)
        }
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                // TODO... 切片编程
                onfulfilled(this.value)
            });
            this.onRejectCallbacks.push(() => {
                onrejected(this.value)
            })
        }
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
export default Promise;