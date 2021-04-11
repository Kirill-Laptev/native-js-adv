console.log('Lesson 7');

// __Proto__
// https://learn.javascript.ru/prototype-inheritance
// https://habr.com/ru/post/518360/
// https://learn.javascript.ru/native-prototypes

// Prototype
// https://learn.javascript.ru/function-prototype
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype


// https://www.youtube.com/watch?v=aQkgUUmUJy4&t=21s
// https://www.youtube.com/watch?v=b55hiUlhAzI


//Task 01
// Реализовать класс Animal который принимает name(по умолчанию 'Animal') в качестве параметра, у которого будет 3
// метода walk, eat, sleep - каждый метод должен выводить в консоль строку имя + действие. Пример:
// walk => `${this.name} walking`
// проверить, что методы работают

interface IAnimal {
    name: string
}

class Animal implements IAnimal {
    name: string

    constructor(name: string = 'Animal') {
        this.name = name
    }

    walk(){
        console.log(`${this.name} is walking`)
    }

    eat(){
        console.log(`${this.name} is eating`)
    }
    sleep(){
        console.log(`${this.name} is sleeping`)
    }
}

const dog = new Animal('French dog')

dog.walk()
dog.eat()
dog.sleep()



//Task 02
// Реализовать класс Monkey на базе класса Animal,  конструктор принимает name(по умолчанию 'Monkey') в качестве
// параметра, реализовать методы roar и climb аналогично классу Animal
// проверить, что все методы работают


class Monkey extends Animal implements IAnimal {
    constructor(name: string){
        super(name)
    }

    roar(){
        console.log(`${this.name} is roaring`)
    }

    climb(){
        console.log(`${this.name} is climbing`)
    }
}

const monkey2 = new Monkey('Abu monkey')

monkey2.climb()
monkey2.roar()

console.log(monkey2)

//Task 03
// Реализовать класс Human на базе класса Monkey, конструктор принимает name(по умолчанию 'Human') в качестве
// параметра, реализовать методы speak и think аналогично классу Animal
// проверить, что все методы работают


// Task 04
// Реализовать таски 01-03 через функции конструкторы в отдельном JS файле, реализовать наследование

// Сделано в файле lesson7.js

// Task 05
// Используя метод Apply реализовать свой собственный метод bind


// Нужно разобрать это !!! Может встретиться на собесе.
// Заучить наизусть.
// Function.prototype._bind = function(ctx, ...args) {
//     const _this = this
//     return function(...args2){
//         return _this.apply(ctx, [...args, ...args2])
//     }
// }


// just a plug
export default () => {};