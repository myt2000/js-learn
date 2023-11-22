// console.log(_)
// 只能放在最外层作用域
// import _ from './a.js' // 类似函数 可以提前变量提升


// _ = 'world' // 不能修改导出后的结果

// 有很多模块
// import { b, c, d } from './a.js'

// console.log(b, c, d)

// 如果导出变量同名，会报错 SyntaxError: The requested module './a.js' contains conflicting star exports for name 'd'

let btn = document.createElement('button')
// bundle.js
btn.addEventListener('click', function () {
    // import()语法  返回的是一个promise, 我们可以拿到结果中的default 就是默认导出的结果 import * as res from './'
    import('./d.js').then((res) => {    // default 关键字
        console.log(res.default)
    })
})

document.body.appendChild(btn)


// import官方地址： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
