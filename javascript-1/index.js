/*
    Написать функцию суммирования значений
    Написать функцию sum, которая может быть исполнена любое количество раз с не `undefined` аргументом.
    Если она исполнена без аргументов, то возвращает значение суммы всех переданных до этого значений.

    sum(1)(2)(3)....(n)() === 1 + 2 + 3 + ... + n
 */

function sum(arg) {
    let __sum = function (p) {
        if (typeof p !== 'undefined') {
            if (__sum.__data)
                __sum.__data += p
            else
                __sum.__data = p
            return __sum
        }
        else
            return __sum.__data
    }

    return __sum(arg)
}


(function () {
    console.log(sum(1)(2)(3)() === 6)
    console.log(sum(1)(2)(3) !== 6)
    console.log(sum(null)() === null)
    console.log(sum() === undefined)
    console.log(sum(1)(3)(null)(true)('test')() === '5test')
    console.log(sum('otus')(1)(3)(null)(true)('test')() === 'otus13nulltruetest')
})()