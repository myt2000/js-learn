// z 文件 需要整合 x文件和 y文件

// import { x } from './x.js'
// import { y } from './y.js'

// export { x, y }

export * from './x.js'
export { y } from './y.js'  // 在文件中导出部分内容

// console.log(y)  // 没有声明import 才会有声明的效果，这里无法打印