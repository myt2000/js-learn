// 观察者模式 观察者和被观察者 是有关联的 观察者需要将自己放到被观察者之上， 当被观察者状态发生变化，需要通知所有的观察者
class Subject { // 被观察者
    constructor(name) {
        this.name = name
        this.status = '开心'
        this.observers = []
    }
    attach(o) {   // 需要将注册这放到自己的身上
        this.observers.push(o)
    }
    setState(state) {
        this.state = state
        this.observers.forEach(o => {
            o.update(this)
        })
    }
}

class Observe { // 观察者
    constructor(name) {
        this.name = name
    }
    update(s) { // 等会被观察者的状态发生变化会调用这个方法
        console.log(`${this.name} : ${s.name} 当前的状态是 ${s.state}`)
    }
}

let baby = new Subject('小宝宝')
let parent = new Observe('爸爸')
let mother = new Observe('妈妈')
baby.attach(parent)
baby.attach(mother)
baby.setState('不开心')


// 我家有个小宝宝， 我要监控我家小宝宝的状态
// 开心 ->  不开心