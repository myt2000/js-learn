// ES6中的模块化问题

// 什么叫模块  只要是一个js文件他就是一个模块
// 模块化解决的问题，命名冲突（命名空间）采用自执行函数的方式， 解决代码的高内聚低耦合
// node中自带的模块化功能 require module.exports commonjs规范
// node模块 commonjs规范  es模块   esModule umd


// 如果我希望使用一个模块 require, 如果希望给别人用 module.exports

// es6模块如果希望给别人用  exports 如果你希望用别人 就使用exports

// es6 => node规范  webpack环境下可以通用



// 如果通过相对路径引入，表示自定义模块

// 1. import的特点，可以变量提升， 在没定义之前可以直接使用, 不能放在作用域下
// 2. 不能放到作用域下，只能放到顶层环境
// import { a } from './a.js'  // 从导出的对象一个个取出 这种方式只能一个个取出来
// import * as obj from './a.js'   // 把所有导出的对象obj 把导出的所有结果放到一个变量中
// 这个obj 必须采用export default 才可以拿到
// import obj, { a, b, c } from './a.js'
// console.log(a)

// import { a, b, c, default as d } from './a.js'
// setInterval(() => {
//     // console.log(obj.default) // { a: 1, b: 2 }
//     // console.log(obj.a, obj.b, obj.c) //2 2 3
//     console.log(a, b, c, d) // 3 2 3 { a: 1, b: 2 }
// }, 1000);
// import { a } from './a.js'  // 放后面引用也可以打印a

import * as z from './z.js'
console.log(z)      // [Module: null prototype] { x: 'a', y: 'y' }


// 默认import 语法叫静态语法 动态加载

// 草案中提供了一个语法 import() 可以实现懒加载

let btn = document.createElement('button')

btn.addEventListener('click', async function () {
    let result = await import('./a.js') // 动态导入a这个文件 返回的是一个promise
    console.log(result)
})
document.body.appendChild(btn)

// 模块中的语法 import / export / export default / export xx from '' / import()
