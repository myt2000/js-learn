function printprops(o) {
    for (var p in o)
        console.log(p + ":" + o[p] + "\n");
}

function distance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy)
}

// function factorial(x) {
//     if (x <= 1) return 1;
//     return x * factorial(x - 1)
// }

var square = function (x) { return x * x };

// var f = function face(x) {
//     if (x <= 1) return 1;
//     else return x * factorial(x - 1);
// }

// data.sort(function (a, b) {
//     return a - b;
// })

var tensquared = (function (x) {
    return x * x;
}(10))



function hypotenuse(a, b) {
    function square(x) {
        return x * x;
    }
    return Math.sqrt(square(a) + square(b));
}

// printprops({ x: 1 });   // x:1
var total = distance(0, 0, 2, 1) + distance(2, 1, 3, 5);
// console.log(total)      // 6.35917360311745
// var probability = factorial(5) / factorial(13)
// console.log(probability)    // 1.9270852604185938e-8

var strict = (function () {
    return !this;
}())


var calculator = {
    // 对象直接量
    operand1: 1,
    operand2: 1,
    add: function () {
        // 注意this关键字的用法， this指代当前对象
        this.result = this.operand1 + this.operand2;
    }
};
calculator.add();   // 这个方法调用计算1+1的结果
// console.log(calculator.result);  // 2

// var o = {           // 对象o
//     m: function () {
//         var self = this;        // 对象中的方法m()
//         console.log(this === o);    // true this就是这个对象o
//         f();
//         function f() {          //  //定义一个嵌套函数f()
//             console.log(this === o);    // false this的值是全局对象或undefined 
//             console.log(self === o);    // true self指外部函数的this值
//         }
//     }
// };
// o.m()

var o = new Object();
var o = new Object;

// 将对象o中可枚举的属性名迫加至数组a中，并返回这个数组a
// 如果省略a, 则创建一个新数组并返回这个新数组
function getPropertyNames(o, /*optional*/ a) {
    if (a === undefined) a = []; // 如果未定义，则使用新数组
    for (var property in o) a.push(property);
    return a;
}
// 这个函数调用可以传入1个或2个实参
var a = getPropertyNames(o); // 将o的属性存储到一个新数组中
// console.log(a)  // []
var p = { x: 1 }
getPropertyNames(p, a); // 将p的属性追加至数组a中
// console.log(a)  // [ 'x' ]

// function f(x, y, z) {
//     if (arguments.length != 3) {
//         throw new Error("function f called with"
//             + arguments.length +
//             "arguments, but it expects 3 arguments.")
//     }
//     // 在执行函数的其他逻辑...
// }


function custom_max(/*...*/) {
    var max = Number.NEGATIVE_INFINITY;
    // 遍历实参， 查找并记住最大值
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] > max) max = arguments[i];
    // 返回最大值
    return max;
}
var largest = custom_max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);
// console.log(largest)    // 10000


// function f(x) {
//     console.log(x);
//     arguments[0] = null;
//     console.log(x);
// }

// 严格模式下，不允许调用
// var factorial2 = function (x) {
//     if (x <= 1) return 1;
//     return x * arguments.callee(x - 1);
// }

// console.log(factorial2(10))

// 将原始数组的length元素复制至目标数组
// 开始复制原始数组的from start元素
// 并且将其复制至目标数组的to start中
// 要记住实参的顺序并不容易
function arraycopy(/* array */ from, /* index */ from_start,
                    /* array */ to, /* index */ to_start,
                    /* integer */ length) {
    // 逻辑代码
}
// 这个版本的实现效率稍微有些低，但你不必再去记住实参的顺序
// 并且from start和to start都默认为0
function easycopy(args) {
    arraycopy(args.from,
        args.from_start || 0, // 注意这里设置了默认值
        args.to,
        args.to_start || 0,
        args.length);
}
// 来看如何调用easycopy()
var a = [1, 2, 3, 4], b = [];
easycopy({ from: a, to: b, length: 4 })

// 返回数组(或类数组对象) a的元素的累加和
// 数组a中必须为数字、 null和undefined的元素都将忽略
// function sum(a) {
//     if (isArrayLike(a)) {
//         var total = 0;
//         for (var i = 0; i < a.length; i++) {
//             // 遍历所有元素
//             var element = a[i];
//             if (element == null) continue; // 跳过null和undefined
//             if (isFinite(element)) total += element;
//             else throw new Error("sum(): elements must be finite numbers");
//         }
//         return total;
//     }
//     else throw new Error("sum(): argument must be array-like");
// }


function flexisum(a) {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i], n;
        if (element == nulll) continue;     // 忽略null和undefined实参
        if (isArray(element))               // 如果实参是数组
            n = flexisum.apply(this, element);  // 递归地计算累加和
        else if (typeof element === "function") // 否则，如果是函数...
            n = Nmuber(element())   // 调用它并做类型转换
        else
            n = Number(element);     // 否则直接做类型转换
        if (isNaN(n))       // 如果无法转换为数字，则抛出异常
            throw Error("flexisum(): can't convert" + element());
        total += n;
    }
    return total;
}

// var o = { square: function (x) { return x * x; } }; // 对象直接量
// var y = o.square(16);
// console.log(y) // 256


// var a = [function (x) { return x * x; }, 20]; // 数组直接量
// console.log(a[0](a[1])); // 400


function add(x, y) { return x + y };
function subtract(x, y) { return x - y };
function multiply(x, y) { return x * y };
function divide(x, y) { return x / y }

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2)
}


var i = operate(add, operate(add, 2, 3), operate(multiply, 4, 5))

// 我们为这个例子重复实现一个简单的函数
// 这次实现使用函数直接量，这些函数直接量定义在一个对象直接量中
var operators = {
    add: function (x, y) { return x + y; },
    subtract: function (x, y) { return x - y; },
    multiply: function (x, y) { return x * y; },
    devide: function (x, y) { return x / y; },
    pow: Math.pow  // 使用预定义函数
}

// 这个函数接收一个名字作为运算符，在对象中查找这个运算符
// 然后将它作用于所提供的操作数
// 注意这里调用运算符函数的语法
function operate2(operation, operand1, operand2) {
    if (typeof operators[operation] === "function")
        return operators[operation](operand1, operand2);
    else throw "unknown operator";
}

// 这样来计算("hello" + " "+ "world")的值
var j = operate2("add", "hello", operate2("add", " ", "world"));
// 使用预定义的的函数Math.pow()
var k = operate2("pow", 10, 2)


// var uniqueInteger;
// 初始化函数对象的计数器属性
// 由于函数声明被提前了，因此这里是可以在函数声明
// 之前给它的成员赋值的
// uniqueInteger.counter = 0;

// 每次调用这个函数都会返回一个不同的整数
// 它使用一个属性来记住下一次将要返回的值
// function uniqueInteger() {
//     return uniqueInteger.counter++; // 先返回计数器的值，然后计数器自增1
// }

//计算阶乘，并将结果缓存至函数的属性中
function factorial(n) {
    if (isFinite(n) && n > 0 && n == Math.round(n)) {
        if (!(n in factorial))
            factorial[n] = n * factorial(n - 1)
        return factorial[n];
    }
    else return NaN;
}
factorial[1] = 1;

// var test = factorial(10);

// console.log(test)       // 3628800
// console.log(factorial[9])   // 362880

// console.log(factorial)

function mymodule() {
    // 模块代码
    // 这个模块所使用的所有变量都是局部变量
    // 而不是污染全局命名空间
}
mymodule(); // 不要忘了还要调用这个函数

(function () {
    // 模块代码
}());

var extend = (function () {  // 将这个函数的返回值赋值给extend
    // 在修复它之前，首先检查是否存在bug
    for (var p in { toString: null }) {
        // 如果代码执行到这里，那么for/in循环会正确工作并返回
        // 一个简单版本的extend()函数
        return function extend(o) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source) o[prop] = source[prop];
            }
            return o;
        };
    }
    return function patched_extend(o) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            // 复制所偶的可枚举属性
            for (var prop in source) o[prop] = source[prop];
            for (var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop]
            }
        }
        return o;
    };

    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty",
        "isPropertyOf", "propertyIsEnumerable", "toLocalString"];
}()
)

// console.log(extend)


// var scope = "global scope";
// function checkscope() {
//     var scope = "local scope";
//     function f() {
//         return scope
//     }
//     return f();
// }
// // console.log(checkscope())       // local scope

var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        console.log(1)
        return scope;
    }
    console.log(2)
    return f;
}
// console.log(checkscope())  // local scope

var uniqueInteger = (function () {   //  //定义函数并立即调用
    var counter = 0;
    return function () {
        return counter++;
    }
}())
// console.log(uniqueInteger())


// function counter() {
//     var n = 0;
//     return {
//         count: function () {
//             return n++;
//         },
//         reset: function () {
//             n = 0;
//         }
//     }
// }

// var c = counter(), d = counter();
// console.log(c.count())  // 0
// console.log(d.count())  // 0
// console.log(c.reset())  // undefined
// console.log(c.count())  // 0
// console.log(d.count())  // 1


function counter(n) { // 函数参数n是一个私有变量
    return {
        //属性getter方法返回并给私有计数器var递增1
        get count() {
            return n++;
        },
        // 属性setter不允许递减
        set count(m) {
            if (m >= n) n = m;
            else throw Error("count can only be set to a large value")
        }
    }
}

var c = counter(1000);
// console.log(c.count)    // 1000
// console.log(c.count)    // 1001
// console.log(c.count = 2000)
// console.log(c.count)    // 2001
// console.log(c.count = 2000)    // Error!

// 这个函数给对象o增加了属性存取器方法
// 方法名称为get<name>和set<name>。如果提供了一个判定函数
// setter方法就会用它来检测参数的合法性，然后在存储它
// 如果判定函数返回false,setter方法抛出一个异常
//
// 这个函数有一个非同寻常之处，就是getter和setter函数
// 所操作的属性值并没有存储在对象o中
// 相反，这个值仅仅是保存在函数中的局部变量中
// getter和setter方法同样是局部函数，因此可以访问这个局部变量
// 也就是说，对于两个存取器方法来说这个变量是私有的
// 没有办法绕过存取器方法来设置或修改这个值

function addPrivateProperty(o, name, predicate) {
    var value; // 这是一个属性值
    // getter方法简单地将其返回
    o["get" + name] = function () { return value; }

    // setter方法首先检查值是否合法，若不合法就抛出异常
    // 否则就将其存储起来
    o["set" + name] = function (v) {
        if (predicate && !(v))
            throw Error("set" + name + ": invalid value " + v);
        else
            value = v;
    };
}

// 下面的代码展示了addPrivateProperty()方法
var o = {}; // 设置一个空对象

// 增加属性存取器方法getName()和setName()
// 确保只允许字符串值
addPrivateProperty(o, "Name", function (x) { return typeof x == "string"; });

// o.setName("Frank"); // 设置属性值
// console.log(o.getName()); // 得到属性值 Frank
// o.setName(0);   // 试图设置一个错误类型的值

// 这个函数返回一个总是返回v的函数
// function constfunc(v) {
//     return function () {
//         return v;
//     };
// }

// 创建一个数组用来存储常数函数
var funcs = [];
for (var i = 0; i < 10; i++)
    funcs[i] = constfunc(i);

// console.log(funcs[5]()) // 5

function constfunc() {
    var funcs = [];
    for (var i = 0; i < 10; i++) {
        // console.log(i);
        funcs[i] = function () {
            // console.log("怎么是这个数？：" + i)
            return i;
        };
    }
    return funcs;
}
var funcs = constfunc();
// console.log(funcs[5]()) // 10
// for (var i = 0; i < funcs.length; i++) {
//     console.log(funcs[i]()) // 都是10
// }

// 这个函数使用arguments.callee, 因此它不能在严格模式下工作
function check(args) {
    var actual = args.length;   // //实参的真实个数
    var expected = args.callee.length;  // 期望的实参个数
    if (actual !== expected)    // 如果不同则抛出异常
        throw Error("Expected" + expected + "args; got" + actual);
}

// function f(x, y, z) {
//     check(arguments)    // 检查实参个数和期望的实参个数是否一致 
//     return x + y + z;   // 再执行函数的后续逻辑
// }


// console.log(f(1, 2, 3))

// 将对象o中名为m()的方法替换为另一个方法
// 可以在调用原始的方法之前和之后记录日志消息
function trace(o, m) {
    var original = o[m];
    o[m] = function () {
        console.log(new Date(), "Entering:", m);
        var result = original.apply(this, arguments);
        console.log(new Date(), "Exiting:", m);
        return result;
    }
}


// var obj = {
//     m: function () {
//         console.log("Inside m");
//     }
// };

// trace(obj, "m");
// obj.m();
// 2023-10-31T08:14:48.660Z Entering: m
// Inside m
// 2023-10-31T08:14:48.665Z Exiting: m

// function f(y) {
//     return this.x + y;
// }
// var o = { x: 1 };
// var g = f.bind(o);
// console.log(g(2)) // 3

//返回一个函数，通过调用它来调用o中的方法f(),传递它所有的实参
function bind(f, o) {
    if (f.bind) return f.bind(o);   // 如果bind()方法存在的话，使用bind()方法
    else return function () {        // 否则，这样绑定
        return f.apply(o, arguments);
    }
}

var sum = function (x, y) { return x + y };

var succ = sum.bind(null, 1);

// console.log(succ(2)) // 3

function f(y, z) { return this.x + y + z };
var g = f.bind({ x: 1 }, 2);
// console.log(g(3))   // 6

if (Function.prototype.bind) {
    Function.prototype.bind = function (o /*, args */) {
        // 将this和arguments的值保存至变量中
        // 以便在后面嵌套的函数中可以使用它们
        var self = this, boundArgs = arguments;
        // bind()方法的返回值是一个函数
        return function () {
            // 创建一个实参列表，将传入bind()的第二个及后续的实参都传入这个函数
            var args = [], i;
            for (i = 1; i < boundArgs.length; i++) args.push(boundArgs[i])
            for (i = 0; i < boundArgs.length; i++) args.push(arguments[i])
            // 现在将self作为o的方法来调用，传入这些实参
            return self.apply(o, args);
        }
    }
}


// var f = new Function("x", "y", "return x*y;");

// var f = function (x, y) { return x * y; }

// var scope = "global";
// function constructFunction() {
//     var scope = "local";
//     return new Function("return scope");    // 无法捕获局部作用域
// }

// var test = constructFunction()();
// console.log(test)


function isFunction(x) {
    return Object.prototype.toString.call(x) === "[object Function]"
}

var data = [1, 1, 3, 5, 5];

// 平均数是所有元素的累加和值除以元素个数
var total = 0;

for (var i = 0; i < data.length; i++) total += data[i];
var mean = total / data.length; // 平均数是3
// console.log(mean)
// 计算标准差，首先计算每个数据减去平均数之后偏差的平方然后求和
total = 0;
for (var i = 0; i < data.length; i++) {
    var deviation = data[i] - mean;
    total += deviation * deviation;
}

var stddev = Math.sqrt(total / (data.length - 1)); // 标准差的值是2
// console.log(stddev)

// 首先定义两个简单的函数
var sum = function (x, y) { return x + y };
var square = function (x) { return x * x };

// 然后将这些函数和数组方法配合使用计算出平均数和标准差
var data = [1, 1, 3, 5, 5];
var mean = data.reduce(sum) / data.length;
var deviations = data.map(function (x) { return x - mean; });
var stddev = Math.sqrt(deviations.map(square).reduce(sum) / (data.length - 1))
// console.log(mean)   // 3
// console.log(stddev) //2


var map = Array.prototype.map ? function (a, f) { return a.map(f); } : function (a, f) {
    var results = [];
    for (var i = 0, len = a.length; i < len; i++) {
        if (i in a) results[i] = f.call(null, a[i], i, a);
    }
    return results;
};
// 使用函数f()和可选的初始值将数组a减至一个值
// 如果Array.prototype.reduce存在的话，就使用这个方法
var reduce = Array.prototype.reduce ? function (a, f, initial) {
    if (arguments.length > 2)
        return a.reduce(f, initial);
    else return a.reduce(f);
} : function (a, f, initial) {
    var i = 0, len = a.length, accumulator;
    if (arguments.length > 2) accumulator = initial;
    else {
        if (len == 0) throw TypeError();
        while (i < len) {
            if (i in a) {
                accumulator = a[i++];
                break;
            }
            else i++;
        }
        if (i == len) throw TypeError();
    }
    while (i < len) {
        if (i in a)
            accumulator = f.call(undefined, accumulator, a[i], i, a);
        i++;
    }
    return accumulator;
};

var data = [1, 2, 3, 4, 5];
var sum = function (x, y) { return x + y };
var square = function (x) { return x * x };
var mean = reduce(data, sum) / data.length;
var devirations = map(data, function (x) { return x - mean; });
var stddev = Math.sqrt(reduce(map(deviations, square), sum) / (data.length - 1));
// console.log(stddev) // 2
// console.log(deviations) // [ -2, -2, 0, 2, 2 ]


// function not(f) {
//     return function () { // 返回一个新的函数
//         var result = f.apply(this, arguments); // 调用f()
//         return !result;
//     }
// };
var even = function (x) {
    // 判断a是否为偶数的函数
    return x % 2 === 0;
};

// var odd = not(even);        // 一个新函数，所做的事情和even()相反
// console.log([1, 1, 3, 5, 5].every(odd)); //  true: 每个元素都是奇数


function mapper(f) {
    return function (a) { return map(a, f); };
}


var increment = function (x) { return x + 1 };
var incrementer = mapper(increment);
// console.log(incrementer([1, 2, 3])) // [ 2, 3, 4 ]

// 返回一个新的可以计算f(g(…))的函数
// 返回的函数h()将它所有的实参传入g(),然后将g()的返回值传入f()
// 调用f()和g()时的this值和调用h()时的this值是同一个this
function compose(f, g) {
    return function () {
        // 需要给f()传入一个参数，所以使用f()的call()方法
        // 需要给g()传入很多参数，所以使用g()的apply()方法
        return f.call(this, g.apply(this, arguments));
    }
};

var square = function (x) { return x * x };
var sum = function (x, y) { return x + y };
var squareofsum = compose(square, sum);
// console.log(squareofsum(2, 3))  // 25


function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}
// 这个函数的实参传递至左侧
function partialLeft(f /*, ...*/) {
    var args = arguments;    // 保存外部的实参数组
    console.log(args)
    return function () {     // 并返回这个函数
        var a = array(args, 1);  // 开始处理外部的第1个args
        a = a.concat(array(arguments)); // 然后增加所有的内部实参
        console.log("最后的参数" + a)  // [ 2, 3, 4 ]
        return f.apply(this, a);    // 然后基于这个实参列表调用f()
    };
}

// 这个函数的实参传递至右侧
function partialRight(f /*,...*/) {
    var args = arguments;   // 保存外部实参数组
    return function () {        // 返回这个函数
        var a = array(arguments);    // 从内部参数开始
        a = a.concat(array(args, 1))    // 然后从外部第1个args开始添加
        // console.log(a)  // [ 3, 4, 2 ]
        return f.apply(this, a);    // 最后基于这个实参列表调用f()
    };
}


// 这个函数的实参被用做模板
// 实参列表中的undefined值都被填充
function partial(f /*,... */) {
    var args = arguments;   // 保存外部实参数组
    return function () {
        var a = array(args, 1); // 从外部args开始
        var i = 0, j = 0;
        // 遍历args,  从内部实参填充undefined值
        for (; i < a.length; i++)
            if (a[i] === undefined) a[i] = arguments[j++];
        // 现在将剩下的内部实参都追加进去
        a = a.concat(array(arguments, j))
        return f.apply(this, a);
    }
}

// 这个函数带有三个实参
var fu = function (x, y, z) { return x * (y - z); };

// 注意这三个不完全调用之间的区别
// console.log(partialLeft(fu, 2)(3, 4))              //=>-2:绑定第一个实参：2*(3-4)
// console.log(partialRight(fu, 2)(3, 4))           //=>6:绑定最后一个实参：3 *(4 -2)
// console.log(partial(fu, undefined, 2)(3, 4)) //=>-6: 绑定中间的实参：3*(2 -4)

var increment = partialLeft(sum, 1);
// console.log(increment(1, 2))
var cuberoot = partialRight(Math.pow, 1 / 3);
// console.log(cuberoot(1))
// 等同于
// console.log(Math.pow(1, 1 / 3))
String.prototype.first = partial(String.prototype.charAt, 0);
String.prototype.last = partial(String.prototype.substr, -1, 1);

var not = partialLeft(compose, function (x) { return !x; });
var even = function (x) { return x % 2 === 0; };
var odd = not(even);
var isNumber = not(isNaN);

var data = [1, 1, 3, 5, 5];
var sum = function (x, y) { return x + y };
var product = function (x, y) { return x * y };
var neg = partial(product, -1);
var square = partial(Math.pow, undefined, 2);
var sqrt = partial(Math.pow, undefined, -5);
var reciprocal = partial(Math.pow, undefined, -1);

// 现在计算平均值和标准差，所有的函数调用都不带运算符
// 这段代码看起来很像lisp代码
var mean = product(reduce(data, sum), reciprocal(data.length));
var stddev = sqrt(product(reduce(map(data, compose(square, partial(sum, neg(mean)))), sum), reciprocal(sum(data.length, -1))));
// console.log(mean)   // 3
// console.log(stddev) // 0.0009765625


// 返回f()的带有记忆功能的版本
// 只有当f()的实参的字符串表示都不相同时它才会工作
function memorize(f) {
    var cache = {}; // 将值保存在闭包内
    return function () {
        // 将实参转换为字符串形式，并将其用做缓存的键
        var key = arguments.length + Array.prototype.join.call(arguments, ",");
        if (key in cache) return cache[key];
        else return cache[key] = f.apply(this, arguments);
    }
}


// 返回两个整数的最大公约数
// 使用欧几里德算法：http://en.wikipedia.org/wiki/Euclidean  algorithm
function gcd(a, b) { // 这里省略对a和b的类型检查
    var t;
    if (a < b) t = b, b = a, a = t;     // 临时变量用来存储交换数值
    while (b != 0) t = b, b = a % b, a = t;    // 这是求最大公约数的欧几里德算法
    return a;
}

var gcdmemo = memorize(gcd);
gcdmemo(85, 187); // => 17
// 注意，当我们写一个递归函数时，往往需要实现记忆功能
// 我们更希望调用实现了记忆功能的递归函数，而不是原递归函数
var factorial1 = memorize(function (n) {
    return (n <= 1) ? 1 : n * factorial1(n - 1);
})
console.log(factorial1(5)) // 120

