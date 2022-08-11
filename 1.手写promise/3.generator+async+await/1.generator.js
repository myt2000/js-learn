// generator 生成器 生成的是迭代器
// 普通函数执行时 没有停止功能， generator函数，可以暂停

function* read() {
    yield 1;    // 产出
    yield 2;    // 产出
    yield 3;    // 产出
    yield 4;    // 产出
}

let it = read();    // iterator 迭代器中包含一个next方法
// console.log(it)     // Object [Generator] {}

// 迭代器接口 Symbol.iterator
// console.log(it.next())  //  { value: undefined, done: true } 碰到yield关键字就停止了

// console.log(it.next())

let done = false;
while (!done) {
    let obj = it.next()
    done = obj.done;
    console.log(obj.value)
}






