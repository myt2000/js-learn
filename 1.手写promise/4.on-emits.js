import { readFile } from 'fs'
// 订阅好一件事 当这件事发生的时候 触发对应的函数
// 订阅 :on 发布: emit  promise内部也是基于发布订阅的

let e = {
    _obj :{},
    _callback: [],
    on(callback){   // 订阅就是函数放到数组中
        this._callback.push(callback)
    },
    emit(key, value){
        this._obj[key] = value
        this._callback.forEach(method=>{
            method(this._obj)
        })
    }
}

e.on(function(obj) { // 每次发布都会触发函数
    console.log(obj)
})
e.on(function(obj) { // 每次发布都会触发函数
    console.log(obj)
})
readFile('./age.txt', 'utf8',function (error, data) {
    e.emit('age', data)
})

readFile('./name.txt', 'utf8', function(error, data){
    e.emit('name',data)
})
    
// 发布订阅 所有库中都存在发布订阅
// 观察者模式