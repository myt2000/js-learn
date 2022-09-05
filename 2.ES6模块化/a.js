// export const a = 1  // 表示我要把a导出

let a = 1;
let b = 2;
let c = 3;

setInterval(() => {
    a++;
}, 1000)

export {    // 导出的是变量，不是具体指
    a,
    b,
    c
}


// 默认导出 直接导出某个变量， 外层引入的时候，可以直接获取到

// export default { a: 1, b: 2 }

// let obj = { a: 1, b: 2 }
// export {
//     obj as default  // 使用 as 重命名 为default后 等价于 export default
// }

let q = 100
export default q;
setInterval(() => {
    a++;
    q++;
}, 1000)
// export 与 export default 的区别
// 不能多次 default导出






