// import { b } from './b'
// import { c } from './c'

// export {
//     b, c
// }

// 导入并导出, 不能使用 b 和 c 模块中的内容，不能再使用 这两个文件的内容，因为立即被导出了
export * from './b.js'
export * from './c.js'


