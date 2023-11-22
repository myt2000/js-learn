// prototype __proto__ constructor
// es5中没有类， 只有函数构造， 可以把函数当成类


// 用es5 来模拟一个es6 的类 1） 判断当前这个调用方式是不是通过new 来调用

class Eat {
    a() {

    }
}

console.log(Eat.prototype)  // Eat {}


function defineProperty(target, protoProperties) {
    if (Array.isArray(protoProperties)) {
        for (let i = 0; i < protoProperties.length; i++) {
            let property = protoProperties[i];
            Object.defineProperty(target, property.key, {
                configurable: true,
                enumrable: false,
                ...property
            })
        }
    }
}
function defineProperty(Constructor, protoProperties, staticProperties) {
    if (Array.isArray(protoProperties)) {
        define(Constructor.property.staticProperties)
    }
    if (Array.isArray(staticProperties)) {  // 定义静态方法
        define(Constructor, staticProperties)
    }
}


var Animal = (function () {
    function Animal() {
        if (!(this instanceof Animal)) {
            throw new Error('not new')
        }
        this.name = '熊猫'
    }
    defineProperty(Animal.prototype, [
        {
            key: 'say', value: function () {
                console.log('say')
            }
        }, {
            key: 'eat', value: function () {
                console.log('eat')
            }
        }
    ], [
        // 描述类上的属性
        {
            key: 'a',
            value: function () {
                return 123
            }

        }, {
            key: 'b',
            value: 123
        }
    ])
    return Animal
})()


// function Animal() {     // 如何只能通过new 来调用
//     this.name = '熊猫';
//     // this.say = function(){}
// }
// Animal.prototype.say = function () {  // 所有的人是共用这个方法的

// }

// Animal.a = 1 // 静态属性


console.log(Animal.a(), Animal.bind())
let animal1 = new Animal();  // 构造函数中的this默认指向实例
let animal2 = new Animal();

console.log(animal1.say === animal2.say)
// 如果new这个类  返回的是一个 引用类型 function object 这个this就会指向当前的返回结果
// console.log(animal)


// Animal(); // 报错 throw new Error('not new')
new Animal();


console.log(Animal.prototype)