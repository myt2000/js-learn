import { readFile } from 'fs'
// 订阅好一件事 当这件事发生的时候 触发对应的函数
// 订阅 :on 发布: emit  promise内部也是基于发布订阅的


// 这块代码执行的非常精妙 1. e.on首先执行, 但并没有执行里面的匿名函数function， 只是将匿名函数function加入到e._callback中, e.emit执行后，在执行e._callback数组里面的匿名函数
let e = {
    _obj: {},
    _callback: [],
    on(callback) {   // 订阅就是函数放到数组中
        this._callback.push(callback)
    },
    emit(key, value) {
        this._obj[key] = value  // 让订阅的数组中的方法 依次执行
        this._callback.forEach(method => {
            method(this._obj)
        })
    }
}
// 只要发布了 就应该让订阅的事执行
e.on(function (obj1) { // 每次发布都会触发函数
    console.log(obj1)
})
// Object转为array
console.log(Object.keys({ name: '1', age: 2 }))     // [ 'name', 'age' ]
console.log(Object.values({ name: '1', age: 2 }))   // [ '1', 2 ]
console.log(Object.entries({ name: '1', age: 2 }))  // [ [ 'name', '1' ], [ 'age', 2 ] ]

e.on(function (obj2) { // 每次发布都会触发函数
    // es5 的方法 可以将对象 转化成数组
    if (Object.keys(obj2).length === 2) {
        console.log('--------')
        console.log(obj2)
    }

})
readFile('./age.txt', 'utf8', function (error, data) {
    e.emit('age', data)
})

readFile('./name.txt', 'utf8', function (error, data) {
    e.emit('name', data)
})

// 发布订阅 所有库中都存在发布订阅  特点是 订阅方和发布方 没有任何的关系
// 观察者模式 观察者 被观察者