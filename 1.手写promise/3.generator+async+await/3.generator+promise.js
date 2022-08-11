import util from 'util';
import fs from 'fs';
let read = util.promisify(fs.readFile)


function* readAge() {
    let content = yield read('./name.txt', 'utf8')
    let age = yield read(content, 'utf8')
    return age
    // return 1
}


// 这样写比较麻烦，有多少层就要写多少个then
// let it = readAge();
// let { value } = it.next();
// value.then(data => {
//     let { value } = it.next(data);
//     value.then(data => {
//         let { value, done } = it.next(data);
//         console.log(value, done)
//     })
// })

function co(it) {
    return new Promise((resolve, reject) => {
        // 异步迭代， 需要next函数
        function next(r) {
            let { value, done } = it.next(r);
            if (done) {
                resolve(value)
            }
            else {
                Promise.resolve(value).then(data => {
                    next(data)
                }, reject)
            }
        }
        next()
    })
}
// co函数依次取执行生成器


co(readAge()).then(data => {
    console.log(data);
})


function* test() {
    try {
        yield 100
    } catch (e) {
        console.log('err', e)
    }
}


let it = test();
it.next()
it.throw('hello')


// 编译出来的结果就是generator
async function test() { // async函数返回的就是一个promise
    try {
        let r = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('hello')
            }, 1000)
        })
        console.log(r)
    } catch (e) {
        console.log('err', e)
    }
}

test();


// 把promise原理搞定
// 1) 柯里化和反柯里化
// 2) finally方法 race方法