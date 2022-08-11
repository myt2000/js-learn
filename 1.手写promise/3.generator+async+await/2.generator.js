// es6特性
function* read() {
    let a = yield 1;
    console.log(a);
    let b = yield 2;
    console.log(b);
    let c = yield 3;
    console.log(c);
}
let it = read();

it.next("hello");
it.next("world");   // next传递的参数会给上一次yield的返回值
it.next("xxx")
