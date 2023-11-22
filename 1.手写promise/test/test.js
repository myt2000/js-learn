let a = "hello"

setTimeout(() => {
    let i = 1
    while (i != 10000) {
        i++
    }
    console.log('完成了')
}, 10000)


console.log(a)