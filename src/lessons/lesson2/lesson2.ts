console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9

// const sum = (num1: number) => {
//     let a = num1;
//     return (num2: number) => {
//         let b = num2
//         return a + b
//     }
// }

const sum = (n1: number) => {
    return (n2: number) => {
        return n1 + n2
    }
}

console.log(sum(3)(6))

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

// При каждом вызове makeCounter() у нас создается новый объект лексического окружения, 
// и каждой возвращаемой функции передается ссылка на объект лексического окружения. Это просто. 

// const makeCounter = () => {
//     let count = 0
//     return () => {
//         count += 1
//         return count
//     }
// }

const makeCounter = () => {
    let count = 0
    return () => {
        return ++count
    }
}

const counter = makeCounter()
console.log(counter())
console.log(counter())
const counter2 = makeCounter()
console.log(counter2())
console.log(counter())


// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;
// getCount: текущее состояние счетчика;

const makeCounter2 = (startCount: number) => {
    return {
        increase: () => ++startCount,
        decrease: () => --startCount,
        reset: () => {
            startCount = 0
            return startCount
        },
        set: (newCount: number) =>{
            startCount = newCount
            return startCount
        },
        getCount: () => startCount 
    }
}

const counterObj = makeCounter2(10)
counterObj.increase()
counterObj.increase()
counterObj.increase()
console.log(counterObj.getCount()) // 13

const counterObj2 = makeCounter2(100)
counterObj2.decrease() 
console.log(counterObj2.getCount()) // 99
counterObj2.set(50) 
console.log(counterObj2.getCount()) // 50
counterObj.increase()
console.log(counterObj.getCount()) // 14



// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// Разобрать как работает эта задача !!!!! + порешать задачи на рекурсию 

const superSum = (n: number): any => {
    if(n === 0) return 0
    if(n === 1) return (num: number) => num
    
    let _arguments: number[] = []

    const helper = (...args: number[]) => {
        _arguments = [..._arguments, ...args]
        if(_arguments.length >= n){
            _arguments.length = n // Обрезание длины массива
            return _arguments.reduce((acc, number) => acc + number)
        } else {
            return helper
        }
    }
    return helper
}


console.log(superSum(0)) //0
console.log(superSum(3)(2)(5)(3)) //10
console.log(superSum(3)(2)(5,3)) //10
console.log(superSum(3)(2,5,3)) //10
console.log(superSum(3)(2,5)(3)) //10
console.log(superSum(3)(2,5)(3,9)) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore

// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion


// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.

// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

// let result = 0
// const sumTo = (num: number) => {
// 	if(num > 0){
// 		result += num
// 		num--
// 		sumTo(num)
//     }
//     return result
// }

const sumTo = (num: number): number => {
	if(num === 1) return num
	return num + (sumTo(num - 1))
}

console.log(sumTo(100)) // 5050


// Вычислить факториал.

// 1! = 1
// 2! = 2 * 1 = 2
// 3! = 3 * 2 * 1 = 6
// 4! = 4 * 3 * 2 * 1 = 24
// 5! = 5 * 4 * 3 * 2 * 1 = 120

const factorial = (num: number): number => {
    if(num === 1) return num
    return num * factorial(num - 1)
}

console.log(factorial(4)) // 24


// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.

const selfFlat = (arr: any): any => {
    let result: any = []
   
    for(let i = 0; i < arr.length; i++){
        if(Array.isArray(arr[i])){
            result = [...result, ...selfFlat(arr[i])]
        } else{
            result = [...result, arr[i]]
        }
    }
    return result
}


const arrNum = [1, 2, 5, [3, 4, [1, 5, [3, 6, 9]]]]

console.log(selfFlat(arrNum)) // [1, 2, 5, 3, 4, 1, 5, 3, 6, 9]


// just a plug
export default () => {};