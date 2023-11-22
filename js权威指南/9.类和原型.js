// 模拟原型继承
function inherit(p) {
    if (p == null) throw TypeError();  // p是一个对象， 但不能是null
    if (Object.create)               // 如果Object.create()存在
        return Object.create(p);    // 直接使用它
    var t = typeof p;               // 否则进行进一步检测
    if (t !== "Object" && t !== "function") throw TypeError();
    function f() { };                //  定义一个空构造函数
    f.prototype = p;                // 将其原型属性设置为p
    return new f                    // 使用f()创建p的继承对象
}

// range.js:实现一个能表示值的范围的类
// 这个工厂方法返回一个新的"范围对象"
// function range(from, to) {
//     // 使用inherit()函数来创建对象，这个对象继承自在下面定义的原型对象
//     // 原型对象作为函数的一个属性存储，并定义所有"范围对象"所共享的方法(行为) 
//     var r = inherit(range.methods);
//     // 存储新的"范围对象"的起始位置和结束位置(状态)
//     // 这两个属性是不可继承的，每个对象都拥有唯一的属性
//     r.from = from;
//     r.to = to;
//     // 返回这个新创建的对象
//     return r;
// }

// 原型对象定义方法，这些方法为每个范围对象所继承
// range.methods = {
//     // 如果x在范围内，则返回true;否则返回false
//     // 这个方法可以比较数字范围，也可以比较字符串和日期范围
//     includes: function (x) {
//         return this.from <= x && x <= this.to;
//     },
//     // 对于范围内的每个整数都调用一次f
//     // 这个方法只可用做数字范围
//     foreach: function (f) {
//         for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);     // Math.ceil() 对一个数字进行上取整
//     },
//     // 返回表示这个范围的字符串
//     toString: function () { return "(" + this.from + "..." + this.to + ")" }
// }


// function add(x) {
//     x = x + 1
//     console.log(x)
// }

// 这里是使用"范围对象"的一些例子
// var r = range(1, 3);
// console.log(r.includes(2)); // true
// r.foreach(console.log); // 1 2 3
// console.log(r); // { from: 1, to: 3 }

// r.foreach(add)
// r.foreach(console.log)
// console.log(r.toString())   // (1...3)



// range2.js: 表示值的范围的类的另一种实现
function range(from, to) {
    return new Range(from, to);
}

// 这是一个构造函数，用以初始化新创建的"范围对象"
// 注意，这里并没有创建并返回一个对象，仅仅是初始化
function Range(from, to) {
    // 存储"范围对象"的起始位置和结束位置(状态)
    // 这两个属性是不可继承的，每个对象都拥有唯一的属性
    this.from = from;
    this.to = to;
}

// 所有的"范围对象"都继承自这个对象
// 注意，属性的名字必须是"prototype"
Range.prototype = {
    // 如果x在范围内，则返回true; 否则返回false
    // 这个方法可以比较数字范围，也可以比较字符串和日期范围
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    // 对于范围内的每个整数都调用一次f
    // 这个方法只可用于数字范围
    foreach: function (f) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
    },
    // 返回表示这个范围的字符申
    toString: function () { return "(" + this.from + "..." + this.to + ")" }
}






// 这里是使用"范围对象"的一些例子
var r = range(1, 3);    // 创建一个范围对象
// r.includes(2);          // true:2 在这个范围内
// r.foreach(console.log); // 1 2 3
// console.log(r);         // { from: 1, to: 3 }
// console.log(r.toString())   // (1...3)
console.log(r instanceof Range) // true


// Range.prototype = {
//     construct: Range,   // 显示设置构造函数反向引用
//     includes: function (x) {
//         return this.from <= x && x <= this.to;
//     },
//     // 对于范围内的每个整数都调用一次f
//     // 这个方法只可用于数字范围
//     foreach: function (f) {
//         for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
//     },
//     // 返回表示这个范围的字符申
//     toString: function () { return "(" + this.from + "..." + this.to + ")" }
// }


// 另一种写法
// 扩展预定义的Range.prototype对象，而不重写之
// 这样就自动创建Range.prototype.constructor属性
// Range.prototype.includes = function (x) {
//     return this.from <= x && x <= this.to;
// };

// Range.prototype.foreach = function (f) {
//     for (var x = Math.ceil(this.from); x <= this.to; x++) f(x);
// };

// Range.prototype.toString = function () {
//     return "(" + this.from + "..." + this.to + ")"
// }


// /* 把o的属性复制到p属性中*/
// function extend(o, p) {
//     for (prop in p) {
//         o[prop] = p[prop];
//     }
//     return o;
// }


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

// 一个用以定义简单类的函数
function defineClass(construct,     // 用以设置实例的属性的函数
    methods,                        // 实例的方法，复制至原型中
    statics)                     // 类属性，复制至构造函数中
{
    if (methods) extend(construct.prototype, methods);
    if (statics) extend(construct, statics);
    return construct;
}

// 这是Range类的另一个实现
var SimpleRange = defineClass(
    function (f, t) { this.f = f; this.t = t },
    {
        includes: function (x) { return this.from <= x && x <= this.to; },
        toString: function () { return this.f + "..." + this.to }
    },
    {
        upto: function (t) { return new SimpleRange(0, t) }
    }
)


/*
* Complex.js
*这个文件定义了Complex 类，用来描述复数
*回忆一下，复数是实数和虚数的和，并且虚数i是- 1的平方根 */
/*
* 这个构造函数为它所创建的每个实例定义了实例字段r和i
* 这两个字段分别保存复数的实部和虚部
* 它们是对象的状态 
*/
function Complex(real, imaginary) {
    if (isNaN(real) && isNaN(imaginary))    // 确保两个实参都是数字
        throw new TypeError();              // 如果不都是数字则抛出错误
    this.r = real;                          // 复数的实部
    this.i = imaginary;                     // 复数的虚部
}

/*
*类的实例方法定义为原型对象的函数值属性
*这里定义的方法可以被所有实例继承，并为它们提供共享的行为
*需要注意的是， JavaScript 的实例方法必须使用关键字this
*来存取实例的字段
*/
// 当前复数对象加上另外一个复数，并返回一个新的计算和值后的复数对象
Complex.prototype.add = function (that) {
    return new Complex(this.r + that.r, this.i + that.i)
};

// 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数对象
Complex.prototype.mul = function (that) {
    return new Complex(this.r * that.r - this.i * that.i, this.r * that.i + this.i * that.r);
};

// 计算复数的模，复数的模定义为原点(0,0)到复平面的距离
Complex.prototype.mag = function () {
    return Math.sqrt(this.r * this.r + this.i * this.i)
};

// 复数的求负运算
Complex.prototype.neg = function () {
    return new Complex(-this.r, -this.i);
};

// 将复数对象转换为一个字符串
Complex.prototype.toString = function () {
    return "{" + this.r + "," + this.i + "}";
};

//检测当前复数对象是否和另外一个复数值相等
Complex.prototype.equals = function (that) {
    return that != null &&              // 必须有定义且不能是null
        that.constructor === Complex &&    //并且必须是Complex的实例 
        this.r === that.r && this.i === that.i;             //并且必须包含相同的值
}

/*
* 类字段(比如常量)和类方法直接定义为构造函数的属性
* 需要注意的是，类的方法通常不使用关键字this,
* 它们只对其参数进行操作
*/
// 这里预定义了一些对复数运算有帮助的类字段
// 它们的命名全都是大写，用以表明它们是常量
// (在ECMAScript 5中，还能设置这些类字段的属性为只读)
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

// 这个类方法将由实例对象的toString方法返回的字符串格式解析为一个Complex对象
// 或者抛出一个类型错误异常
Complex.parse = function (s) {
    try {   // 假设解析成功
        var m = Complex._format.exec(s); // 利用正则表达式进行匹配
        return new Complex(parseFloat(m[1]), parseFloat(m[2]))
    } catch (x) {
        // 如果解析失败则抛出异常
        throw new TypeError("Can't parse '" + s + "'as a complex number.");
    }
}

// 定义类的“私有”字段，这个字段在Complex,parse()中用到了
// 下划线前缀表明它是类内部使用的，而不属于类的公有API的部分
Complex._format = /^\{([^,]+),([^}]+)\)$/

var c = new Complex(2, 3);  // 使用构造函数创建新的对象
// console.log(c)
var d = new Complex(c.i, c.r);  // 用到了c的实例属性
// console.log(d)
// console.log(c.add(d).toString());            //=>"{5,5}":使用了实例的方法
// 这个稍微复杂的表达式用到了类方法和类字段
// Complex.parse(c.toString()). // 将c转换为字符串
//     add(c.neg()).           // 加上它的负数
//     equals(Complex.ZERO)    // 结果应当永远是"零"


Complex.prototype.toString = function () {
    return "{" + this.r + "," + this.i + "}"
};

// 返回当前复数的共轭复数
Complex.prototype.conj = function () { return new Complex(this.r, -this.i) }

if (!Function.prototype.bind) {
    Function.prototype.bind = function (o/*, args */) {
        // bind()方法的代码...
    }
}


// 多次调用这个函数f, 传入一个迭代数
// 比如，要输出"hello"三次：
// var n = 3;
// n.times(function(n) {console.log(n + "hello");});
Number.prototype.times = function (f, context) {
    var n = Number(this);
    for (var i = 0; i < n; i++) f.call(context, i);
};

// 如果不存在ES5的String.trim()方法的话，就定义它
// 这个方法用以去除字符申开头和结尾的空格
String.prototype.trim = String.prototype.trim || function () {
    if (!this) return this;         // 空字符串不做处理
    return this.replace(/^\s+$/g, "");  // 使用正则表达式进行空格替换
}

// 返回函数的名字，如果它有(非标准的) name属性，则直接使用name属性
// 否则，将函数转换为字符串然后从中提取名字
// 如果是没有名字的函数，则返回一个空字符串
Function.prototype.getName = function () {
    return this.name || (this + "").match(/function\s*([^(]*)/)[1];
};


function typeAndValue(x) {
    if (x == null) return ""; // Null和undefined没有构造函数
    switch (x.constructor) {
        case Number: return "Number:" + x;  // 处理原始类型
        case String: return "String:'" + x + "'"
        case Date: return "Date:" + x;      // 处理内置类型
        case RegExp: return "Regexp:" + x;
        case Complex: return "Complex:" + x;      // 处理自定义类型
    }
}

/**
*以字符串形式返回o的类型：
* -如果o是null,返回"null"; 如果o是 NaN,返回"nan"
*  -如果typeof所返回的值不是"object",则返回这个值
*  (注意，有一些JavaScript的实现将正则表达式识别为函数)
* - 如果o的类不是"Object",则返回这个值
* - 如果o包含构造函数并且这个构造函数具有名称，则返回这个名称 
* -否则， 一律返回"Object"
**/


function type(o) {
    var t, c, n;    // type, class, name
    // 处理null值的特殊情形
    if (o === null) return "null";
    // 另外一种特殊情形： NaN和它自身不相等
    if (o !== o) return "NaN";
    // 如果typeof的值不是"object",则使用这个值
    if ((t = typeof o) !== "object") return t;
    // 返回对象的类名，除非值为"Object"
    // 这种方式可以识别出大多数的内置对象
    if ((c = classof(o) !== "Object")) return c;
    // 如果对象构造函数的名字存在的话，则返回它
    if (o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName()))
        return n;
    // 其他的类型都无法判别， 一律返回"Object"
    return "object";
}


// 返回对象的类
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1)
}


// 返回函数的名字（可能是空字符串），不是函数的话返回null
Function.prototype.getName = function () {
    if ("name" in this) return this.name;
    // function：匹配字符串 function。
    // \s*：匹配零个或多个空白字符（空格、制表符、换页符等）。
    // ([^(]*)：捕获括号内的所有字符，直到遇到左括号为止。这通常会捕获函数名。
    // \(：匹配左括号。
    return this.name = this.toString.match(/function\s*([^(]*)\(/)[1]
}


// // 这个构造函数没有名字
// var Complex = function (x, y) { this.r = x; this.i = y; }
// 这个构造函数有名字
// var Range = function Range(f, t) { this.from = f; this.to = t; }


var lowercase = new Range("a", "z");
var thisYear = new Range(new Date(2009, 0, 1), new Date(2010, 0, 1));

// console.log(lowercase)  // { from: 'a', to: 'z' }
// console.log(thisYear)   // { from: 2008-12-31T16:00:00.000Z, to: 2009-12-31T16:00:00.000Z }

// 如果o实现了除第一个参数之外的参数锁表示的方法， 则返回true
function quacks(o /*,...*/) {
    for (var i = 1; i < arguments.length; i++) {
        // 遍历o之后的所有参数
        var arg = arguments[i];
        switch (typeof arg) {
            case "string":
                if (typeof o[arg] !== "function") return false;
                continue;
            case "function":
                arg = arg.prototype;
            case "object":
                for (var m in arg) {
                    if (typeof arg[m] !== "funciton") continue;
                    if (typeof o[m] !== "function") return false;
                }
        }
    }
    // 如果程序能执行到这里，说明o实现了所有的方法
    return true;
}


var myObject = {
    m1: function () { console.log('m1'); },
    m2: function () { console.log('m2'); },
    m3: function () { console.log('m3'); }
};

// console.log(quacks(myObject, 'm1', 'm2', 'm3'));  // 输出 true



function Set() {    // 这是一个构造函数
    this.values = {};   // 集合数据保存在对象的属性里
    this.n = 0;     // 集合中值的个数
    this.add.apply(this.arguments);    // 把所有参数都添加进这个集合
}

// 将每个参数都添加至集合中
Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {    // 遍历每个参数
        var val = arguments[i]; // 待添加到集合中的值
        var str = Set._v2s(val);    // 把他转换成字符串
        if (!this.values.hasOwnProperty(str)) { // 如果不在集合中
            this.values[str] = val;  // 将字符申和值对应起来
            this.n++;   // 集合中值的计数加一
        }
    }
    return this;        // 支持方法链式调用
}

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function () {
    for (var i = 0; i < arguments.length; i++) {    // 遍历每个参数
        var str = Set._v2s(arguments[i]);            // 将字符串和值对应起来
        if (this.values.hasOwnProperty(str)) {    //    如果它在集合中
            delete this.values[str];     // 删除它
            this.n--;                    // 集合中值的计数减一
        }
    }
    return this;    // 支持链式调用
}

// 如果集合包含这个值，则返回true; 否则，返回false
Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._v2s(value));
}

// 返回集合的大小
Set.prototype.size = function () {
    return this.n;
}


// 遍历集合中的所有元素，在指定的上下文中调用f
Set.prototype.foreach = function (f, context) {
    for (var s in this.values)      // 遍历集合中的所有字符串
        if (this.values.hasOwnProperty(s))  // 忽略继承的属性
            f.call(context, this.values[s]);     // 调用f, 传入value
}

// 这是一个内部函数，所以将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function (val) {
    switch (val) {
        case undefined: return 'u'; // 特殊的原始值
        case null: return 'n';  // 值只有一个字母
        case true: return 't';  // 代码
        case false: return 'f';
        default: switch (typeof val) {
            case 'number': return '#' + val;    // 数字都带有#前缀
            case 'string': return '"' + val;    // 字符串都带有''前缀
            default: return '@' + objectId(val);    // Objs and funcs get @
        }
    }
}


// 对任意对象来说，都会返回一个字符申
// 针对不同的对象，这个函数会返回不同的字符串
// 对于同一个对象的多次调用，总是返回相同的字符串
// 为了做到这一点，它给o创建了一个属性，在ES5中，这个属性是不可枚举且是只读的

function objectId(o) {
    var prop = "|**objectid**|";    // 私有属性，用以存放id
    if (!o.hasOwnProperty(prop))    // 如果对象没有id
        o[prop] = Set._v2s.next++;  // 将下一个值赋给它
    return o[prop]                  // 返回这个id
}
Set._v2s.next = 100; // 设置初始id的值


// var a = new Set('c');
// console.log(a); // Set { values: {}, n: 0 }   可以看到new Set这样是加不进去的
// a.add('a')
// a.add('b')
// console.log(a)  // Set { values: { '"a': 'a', '"b': 'b' }, n: 2 }
// a.remove('a')
// console.log(a)  // Set { values: { '"b': 'b' }, n: 1 }
// console.log(a.size())   // 1
// console.log(a.foreach(console.log)) // b, undefined

// console.log(a.contains("b"))    // true
// console.log(a.contains('a'))    // false




//这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值
//返回值是一个构造函数，它标识这个新类
//注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例
//返回的构造函数包含名/值对的映射表
//包括由值组成的数组，以及一个foreach()迭代器函数

function enumeration(namesToValues) {
    // 这个虚拟的构造函数是返回值
    var enumeration = function () {
        throw "Can't Instantiate Enumerations;"
    };
    // 枚举继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () { return this.name; },
        valueOf: function () { return this.value; },
        toJSON: function () { return this.name; }
    }
    enumeration.values = [];    // 用以存放枚举对象的数组

    // 现在创建新类型的实例
    for (var key in namesToValues) {
        var e = inherit(proto); // 遍历每个值
        e.name = key;  // 创建一个代表它的对象
        e.value = namesToValues[key]; // 给它一个值
        enumeration[key] = e;  // 将它设置为构造函数的属性
        enumeration.values.push(e); // 将它存储到值数组中
    }

    // 一个类方法，用来对类的实例进行迭代
    enumeration.foreach = function (f, c) {
        for (var i = 0; i < this.values.length; i++)
            f.call(c, this.values[i]);
    };
    return enumeration;
}


// var Coin = enumeration({ Penny: 1, Nickel: 5, Dime: 10, Quarter: 25 });
// var c = Coin.Dime;
// console.log(c instanceof Coin);         // true
// console.log(c.constructor === Coin);    // true
// console.log(Coin.Quarter + 3 * Coin.Nickel);    // 40
// console.log(Coin.Dime == 10);           // true
// console.log(Coin.Dime > Coin.Nickel)    // true
// console.log(String(Coin.Dime) + ":" + Coin.Dime)    // Dime:10

// 定义一个表示"玩牌"的类
function Card(suit, rank) {
    this.suit = suit;   // 每张牌都有花色
    this.rank = rank;   // 以及点数
}

//使用枚举类型定义花色和点数
Card.Suit = enumeration({ Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4 });
Card.Rank = enumeration({
    Two: 2, Three: 3, Four: 4,
    Five: 5, Six: 6, Seven: 7,
    Eight: 8, Nine: 9, Ten: 10,
    Jack: 11, Queen: 12, King: 13, Ace: 14
});

// 定义用以描述牌面的文本
Card.prototype.toString = function () {
    return this.rank.toString() + "of" + this.suit.toString();
};


// 比较扑克牌中两张牌的大小
Card.prototype.comapreTo = function (that) {
    if (this.rank < than.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0;
};

// 以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function (a, b) { return a.comapreTo(b); }

// 以桥牌的玩法规则对扑克牌进行排序的函数
Card.orderBySuit = function (a, b) {
    if (a.suit < b.suit) return -1;
    if (a.suit > b.suit) return 1;
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
};


// 定义用以表示一副标准扑克牌的类
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(          // 遍历所有的花色（suit）
        function (s) {
            Card.Rank.foreach(function (r) {    // 遍历所有的点数（rank）
                cards.push(new Card(s, r));
            })
        }
    )
};

// 洗牌的方法：返回牌的数组
Deck.prototype.shuffle = function () {
    // 遍历数组中的每个元素， 随机找出牌面最小的元素，并阈值（当前遍历的元素）交换
    var deck = this.cards, len = deck.length;
    for (var i = len - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));    // 获取随机数(i+1)* 0到1的数字
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
    return this;
}

// 发牌的方法： 返回牌的数组
Deck.prototype.deal = function (n) {
    if (this.cards.length < n) throw "Out of cards";
    return this.cards.splice(this.cards.length - n, n)  // 从this.cards.length - n的地方开始删除数组内容，删掉n个，删掉的内容会以数组的形式返回
};

// 创建一副扑克牌，洗牌并发牌
var deck = (new Deck()).shuffle();
// console.log(deck);
// var hand = deck.deal(13).sort(Card, Card.orderBySuit);
var hand = deck.deal(13).sort(Card.orderBySuit, true);
// for (var key in hand) console.log(hand[key].suit, hand[key].rank);
/*enumeration { name: 'Clubs', value: 1 } enumeration { name: 'Three', value: 3 }
enumeration { name: 'Clubs', value: 1 } enumeration { name: 'Six', value: 6 }
enumeration { name: 'Clubs', value: 1 } enumeration { name: 'Seven', value: 7 }
enumeration { name: 'Clubs', value: 1 } enumeration { name: 'Nine', value: 9 }
enumeration { name: 'Clubs', value: 1 } enumeration { name: 'Jack', value: 11 }
enumeration { name: 'Diamonds', value: 2 } enumeration { name: 'Six', value: 6 }
enumeration { name: 'Diamonds', value: 2 } enumeration { name: 'Eight', value: 8 }
enumeration { name: 'Diamonds', value: 2 } enumeration { name: 'Ten', value: 10 }
enumeration { name: 'Hearts', value: 3 } enumeration { name: 'Three', value: 3 }
enumeration { name: 'Hearts', value: 3 } enumeration { name: 'Four', value: 4 }
enumeration { name: 'Hearts', value: 3 } enumeration { name: 'King', value: 13 }
enumeration { name: 'Spades', value: 4 } enumeration { name: 'Nine', value: 9 }
enumeration { name: 'Spades', value: 4 } enumeration { name: 'Ace', value: 14 } */


// 将这些方法添加至Set类的原型对象中
extend(Set.prototype, {
    toString: function () {
        var s = "{", i = 0;
        this.foreach(function (v) {
            s += ((i++ > 0) ? ", " : "") + v;
        })
        return s + "}";
    },
    //  类似toString, 但是对于所有的值都将调用toLocaleString()
    toLocaleString: function () {
        var s = "{", i = 0;
        this.foreach(function (v) {
            if (i++ > 0) s += ", ";
            if (v == null) s += v; // null和undefined
            else s += v.toLocaleString();   // 其他情况
        });
        return s + "}";
    },
    // 将集合转换为值数组
    toArray: function () {
        var a = [];
        this.foreach(function (v) { a.push(v); });
        return a;
    }
});
// 对于要从JSON转换为字符串的集合都被当做数组来对待
Set.prototype.toJSON = Set.prototype.toArray;


// var set = new Set();
// set.add(1, { a: 1 }, null, 2)
// console.log(set)        // Set {
// // values: { '#1': 1, '@100': { a: 1, '|**objectid**|': 100 } },
// // n: 2
// // }
// console.log(set.toString()) // {1, [object Object]}
// console.log(set.toLocaleString())   // {1, [object Object]}
// console.log(set.toArray())  // [ 1, { a: 1, '|**objectid**|': 100 } ]

// Range类重写它的constructor属性，现在将它添加进去
Range.prototype.constructor = Range;
// 一个Range对象和其他不是Range的对象均不相等
// 当且仅当两个范围的端点相等，它们才相等
Range.prototype.equals = function (that) {
    if (that == null) return false;     // 处理null 和 undefined
    if (that.constructor !== Range) return false;   // 处理非Range对象
    // 当前仅当两个端点相等，才返回true
    return this.from == that.from && this.to == that.to;
}


Set.prototype.equals = function (that) {
    // 一些次要情况的快捷处理
    if (this === that) return true;
    // 如果that对象不是一个集合，它和this不相等
    // 我们用到了instanceof, 使得这个方法可以用于Set的任何子类
    // 如果希望采用鸭式辩型的方法，可以降低检查的严格程度
    // 或者可以通过 this.constructor == that.constructor 来加强检查的严格程度
    // 注意， null和undefined两个值是无法用于instanceof运算的
    if (!that instanceof Set) return false;
    // 如果两个集合的大小不一样，则它们不相等
    if (this.size() !== that.size()) return false;
    // 现在检查两个集合中的元素是否完全一样
    // 如果两个集合不相等，则通过抛出异常来终止foreach循环
    try {
        this.foreach(function (v) {
            if (!that.contains(v))
                throw false;
        })
        return true;
    } catch (x) {
        if (x === false) return false; // 如果集合中有元素在另外一个集合中不存在
        throw x;    // 重新抛出异常
    }
};

var set1 = new Set()
set1.add(1, 2, 3)
var set2 = new Set()
set2.add(1, 2, 3)

var equal_result = set1.equals(set2)
// console.log(equal_result)       // true

Range.prototype.comapreTo = function (that) {
    return this.from = that.from;
}

// 根据下边界来对Range对象排序，如果下边界相等则比较上边界
// 如果传入非Range值，则抛出异常
// 当且仅当this,equals(that)时，才返回0
Range.prototype.comapreTo = function (that) {
    if (!(that instanceof Range))
        throw new Error("Can't compare a Range with" + that);
    var diff = this.from - that.from;           // 比较下边界
    if (diff == 0) diff = this.to - that.to;    // 如果相等，比较上边界
    return diff;
}



// var ranges = new Range(1, 5);
// ranges.sort(function (a, b) {
//     return a.comapreTo(b);
// });


// Range.byLowerBound = function (a, b) {
//     return a.comapreTo(b);
// }
// 调用方式
// ranges.sort(Range.byLowerBound);



var generic = {
    toString: function () {
        var s = '[';
        // 返回一个字符串，这个字符串包含构造函数的名字（如果构造函数包含名字）
        // 这个名字会作为返回字符串的
        // 需要注意的是，函数的名字属性是非标准的，并不是在所有的环境中都可用
        if (this.constructor && this.constructor.name)
            s += this.constructor.name + ":";
        // 枚举所有费继承且费函数的属性
        var n = 0;
        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue; // 跳过继承来的属性
            var value = this[name];
            if (typeof value === "function") continue;// 跳过方法
            if (n++) s += ",";
            s += name + "=" + value
        }
        return s + ']'
    },
    // 通过比较this和that的构造函数和实例属性来判断它们是否相等
    // 这种方法只适合于那些实例属性是原始值的情况，原始值可以通过"==="来比较
    // 这里还处理一种特殊情况，就是忽略由Set类添加的特殊属性
    equals: function (that) {
        if (that == null) return false;
        if (this.constructor !== that.constructor) return false;
        for (var name in this) {
            if (name === "|**objectid**|") continue;    // 跳过特殊属性
            if (!this.hasOwnProperty(name)) continue;   // 跳过继承来的属性
            if (this[name] !== that[name]) return false; // 比较是否相等
        }
        return true;    // 如果所有属性都匹配，
    }
}

// Range.prototype.equals = generic.equals;
// var range1 = new Range(2, 4)
// var range2 = new Range(1, 3);
// console.log(range1.equals(range2));


// function Range(from, to) {
//     // 不要将端点保存为对象的属性，相反
//     // 定义存取器函数来返回端点的值
//     // 这些值都保存在闭包中
//     this.from = function () { return from; };
//     this.to = function () { return to; };
// }

// // 原型上的方法无法直接操作端点
// // 它们必须调用存取器方法
// Range.prototype = {
//     constructor: Range,
//     includes: function (x) { return this.from() <= x && x <= this.to(); },
//     foreach: function (x) {
//         for (var x = Math.ceil(this.from()), max = this.to(); x <= max; x++) f(x);
//     },
//     toString: function () {
//         return "(" + this.from() + "..." + this.to + ")"
//     }
// }

// var r = new Range(1, 5);        // 一个不可修改的范围
// r.from = function () { return 0; }  // 通过方法替换来修改它


// function Set() {
//     this.values = {};   // 用这个对象属性来保存这个集合
//     this.n = 0;         // 集合中值的个数
//     // 如果传入一个类数组的对象，将这个元素添加至集合中
//     // 否则，将所有的参数都添加至集合中
//     if (arguments.length == 1 && isArrayLike(arguments[0]))
//         this.add.apply(this, arguments[0]);
//     else if (arguments.length > 0)
//         this.add.apply(this, arguments);
// }

Complex.polar = function (r, theta) {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
}


Set.fromArray = function (a) {
    s = new Set();          // 创建一个空集合
    s.add.apply(s, a);      // 将数组a的成员作为参数传入add()方法
    return s;               // 返回这个新集合
}

// Set类的一个辅助构造函数
function SetFromArray(a) {
    // 通过以函数的形式调用Set()来初始化这个新对象
    // 将a的元素作为参数传入
    Set.apply(this, a);
}

// 设置原型，以便SetFromArray能创建Set的实例
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1, 2, 3]);
s instanceof Set // => true

// B.prototype = inherit(A.prototype); // 子类派生自父类
// B.prototype.constructor = B;        // 重载继承来的constructor属性


// 用一个简单的函数创建简单的子类
function defineSubclass(superclass,     // 父类的构造函数
    constructor,    // 新的子类的构造函数
    methods,        // 实例方法：复制至原型中
    statics)        // 类属性：复制至构造函数中
{
    // 建立子类的原型对象
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    // 像对常规类一样复制方法和类属性
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    // 返回这个类
    return constructor;
}

// 也可以通过父类够咱函数的方法来做到这一点
Function.prototype.extend = function (constructor, methods, statics) {
    return defineClass(this, constructor, methods, statics);
}


// 构造函数
function SingletonSet(member) {
    this.member = member;   // 记住集合中这个唯一的成员
    // 创建一个原型对象，这个原型对象继承自Set的原型
    SingletonSet.prototype = inherit(Set.prototype);
    // 给原型添加属性
    // 如果有同名的属性就覆盖Set.prototype中的同名属性
    extend(SingletonSet.prototype, {
        // 设置合适的constructor属性
        constructor: SingletonSet,
        // 这个集合是只读的：调用add()和remove()都会报错
        add: function () {
            throw "read-only set";
        },
        // 这个集合是只读的：调用add()和remove()都会报错
        remove: function () {
            throw "read-only set";
        },
        // SingletonSet的实例中永远只有一个元素
        size: function () {
            return 1;
        },
        // 这个方法只调用一次，传入这个集合的唯一成员
        foreach: function (f, context) {
            f.call(context, this.member);
        },
        // contains()方法非常简单：只须检查传入的值是否匹配这个集合唯一的成员即可
        contains: function (x) {
            return x === this.member;
        }
    })
}

SingletonSet.prototype.equals = function (that) {
    return that instanceof Set && that.size() == 1 && that.contains(this.member);
}

function NonNullSet() {
    // 仅链接到父类
    // 作为普通函数调用父类的构造函数来初始化通过该构造函数调用创建的对象
    Set.apply(this, arguments);
}

// 将NonNullSet设置为Set的子类
NonNullSet.prototype = inherit(Set.prototype)
NonNullSet.prototype.constructor = NonNullSet;

// 为了将nul1和undefined排除在外，只须重写add()方法
NonNullSet.prototype.add = function () {
    // 检查参数是不是null或undefined
    for (var i = 0; i < arguments.length; i++)
        if (arguments[i] == null)
            throw new Error("Can't add null or undefined to a NonNullSet");
    // 调用父类的add()方法以执行实际插入操作
    return Set.prototype.add.apply(this, arguments);
}

// 定义一个只能保存字符串的"集合"类
var StringSet = filteredSetSubclass(NonNullSet, function (x) {
    return typeof x === "string";
})
// 这个集合类的成员不能是null、undefined或函数
var MySet = filteredSetSubclass(NonNullSet, function (x) {
    return typeof x !== "function";
})


function filteredSetSubclass(superclass, filter) {
    var constructor = function () {      // 子类构造函数
        superclass.apply(this, arguments);  // 调用父类构造函数
    };
    var proto = constructor.prototype = inherit(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function () {
        // 在添加任何成员之前首先使用过滤器将所有参数进行过滤
        for (var i = 0; i < arguments.length; i++) {
            var v = arguments[i];
            if (!filter(v)) throw ("value" + v + "rejected by filter");
        }
        // 调用父类的add()方法
        superclass.prototype.add.apply(this, arguments);
    };
    return constructor;
}

var NonNullSet = (function () {  // 定义并立即调用这个函数
    var superclass = Set;       // 仅指定父类
    return superclass.extend(
        function () {
            superclass.apply(this, arguments);      // 约等于this.superclass(arguments)， 但是this里面灭有superclass的方法，所以需要借用
        },
        {
            add: function () {
                // 检查参数是否是null或undefined
                for (var i = 0; i < arguments.length; i++)
                    if (arguments[i] == null)
                        throw new Error("Can't add null or undefined");
                return superclass.prototype.add.apply(this, arguments);     // 约等于 this.add(arguments) , 但是this没有这个方法，所以需要借用别的方法
            }
        }
    )
})

/*
* 实现一个FilteredSet,它包装某个指定的"集合"对象，
* 并对传入add()方法的值应用了某种指定的过滤器
* "范围"类中其他所有的核心方法延续到包装后的实例中
*/
var FilteredSet = Set.extend(
    function FilteredSet(set, filter) { // 构造函数
        this.set = set;
        this.filter = filter;
    },
    {
        // 实例方法
        add: function () {
            // 如果已有过滤器，直接使用它
            if (this.filter) {
                for (var i = 0; i < arguments.length; i++) {
                    if (!this.filter(v))
                        throw new Error("FilteredSet: value" + v + "rejected by filter")
                }
                this.set.add.apply(this.set, arguments);
                return this;
            }
        },
        // 剩下的方法保持不变
        remove: function () {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        contains: function (v) {
            return this.set.contains(v);
        },
        size: function () {
            return this.set.size();
        },
        foreach: function (f, c) { this.set.foreach(f, c); }
    }
)

