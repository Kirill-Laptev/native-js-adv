// __proto__
// prototype

console.log({})  // У любого объекта будет свойство __proto__
// alert({}) // [object Object], так как функция alert будет пытаться привести объект к строке
          // Приведение к строке происходите благодаря методу .toString() из __proto__


// Рассмотрим анонимную функцию
console.dir(() => {}) 

// {
// 	__proto__: {
// 		constructor: f Function(),
// 		// ...
// 		__proto__: {
// 			constructor: f Object()
// 			// ...
// 		}
// 	}
// }

// Она создается от конструктора Function(), при этом внутри __proto__ будет сидеть еще одно __proto__,
// там мы видим конструктор Object(), что еще раз подтверждает, что все в JS идет от объекта.



// Идем дальше.

function TestFunction () {
    return this
}

const t = new TestFunction()

console.dir(TestFunction) // Тут мы увидим, что у функции помимо __proto__ появился еще и prototype

// Там будет указан конструктор, который указывает на функцию TestFunction

// {
// 	prototype: {
// 		constructor: f TestFunction(),
// 		__proto__: {                        
//             constructor: f Object() 
//         }
//     },
//     __proto__: {                    //  У функции есть свое __proto__  (это стандартно)
//         constructor: f Function(),
//         __proto__: {
//             constructor: f Object()
//         }
//     }
// }


// Теперь посмотрим на объект, который создала эта функция
console.log(t)

// {
//     __proto__: {
//         constructor: f TestFunction(),
//         __proto__: {
//             constructor: f Object()
//         }
//     }
// }

// Мы видим, что все это очень похоже на prototype. Он полностью ему идентичен.
// Prototype функции конструктора при создании экземпляра-объекта от этой функции, 
// созданному объекту в качестве __proto__ устанавливает ссылку prototype это функции.
// Мы можем это проверить

console.log(TestFunction.prototype === t.__proto__) // true


// Отсюда делаем такую вещь.

TestFunction.prototype.say = function () {
    console.log('hello')
}

t.say() // У объекта-экземпляра будет этот метод, хотя мы создали этот объект по коду раньше
        // Выведется в консоль 'hello'
        // Так это работает.
        // Если мы заглянем в функцию, то в prototype будет сидеть метод .say()
        // Аналогично если мы залезем в __proto__ экземпляра объекта, там так же будет сидеть метод .say()


// И еще такой момент.
// Что будет если мы добавим в __proto__ объекта экземпляра метод ?

const t2 = new TestFunction()
t2.__proto__.sayBye = function () {
    console.log('Bye')
}

console.dir(TestFunction)
console.log(t)
console.log(t2)

// Везде в прототипах появится появится метод .sayBye()
// Это еще раз говорит о том, что каждый экземпляр-объект функции получает ссылку на прототип (prototype) этой функции.
// Получается, добавив метод в прототип (__proto__) любого экземпляра-объекта, 
// у каждого экземпляра в прототипе появится этот метод.
// Потому что это ссылка на один и тот же объект.


// Теперь перейдем к классам.

class TestClass {

}

console.dir(TestClass)

// Класс это та же функция, только обернутая по другому.
// То есть класс под капотом - это конструктор-функция.
// У класса точно такой же prototype как и у функции.


// Что происходит, когда мы описываем метод function declaration в классе.

class TestClass2 {
    sayHi() {
        console.log('hi')
    }
}

console.dir(TestClass2)

// {
//     prototype: {
//         constructor: class TestClass2,
//         sayHi: f sayHi()
//     }
// }

// Этот метод сразу попадает в прототип (prototype)


// И что происходит, когда мы описываем метод стрелочной функцией.

class TestClass3 {
    sayHi() {
        console.log('hi')
    }
     
    sayBye = () => {
        console.log('bye')
    }
}

console.dir(TestClass3)

// {
//     prototype: {
//         constructor: class TestClass2,
//         sayHi: f sayHi()
//         //  ....  sayBye тут не будет
//     }
// }



// Этот метод не попадет в prototype - он попадет сразу в экземпляр-объекта.

let b = new TestClass3()
console.log(b)

// {
//     sayBye: () => console.log('bye')
//     __proto__: {
//         constructor: class TestClass3,
//         sayHi: f sayHi()
//     }
// }

// У нас создается объект, и у него сразу есть метод со стрелочной функцией.


// Не смотря на то что мы работаем с классом, все работает так же как и с функцией-конструктором
// Мы можем таким же образом на экземпляре объекта добавить в прототип (__proto__) метод и он 
// появится у всех экземпляров-объектов класса, и естественно в самом прототипе (prototype) класса.
// Вот пример

b.__proto__.sum = function (a, b) {
    console.log(a + b)
}

console.dir(TestClass3)

// {
//     prototype: {
//         constructor: class TestClass3,
//         sayHi: f sayHi()
//         sum: f (a, b)
//     }
// }

console.log(b)

// {
//     sayHi: f sayHi()
//     __proto__: {
//         constructor: class TestClass3,
//         sum: f (a, b)
//     }
// }



// Ровно такой же результат будет если мы изменим prototype класса.

TestClass3.prototype.Yo = function () {
    console.log('Yo')
}

// У всех объектов-экземпляров от класса будет в прототипе (__proto__) метод .Yo()



// Дальше немножечко дичи. Просто пример как что работает.
// Прототип функции-конструктора и ее экземпляров-объекта можно полностью затереть чем-то другим.
// Пример :

function CreatorFunction () {
    return this
}

const s = new CreatorFunction()

s.__proto__ = {
    XXX: function() {
        console.log('xxx')
    }
}

CreatorFunction.prototype = {
    XXX: function() {
        console.log('xxx')
    }
}

console.dir(CreatorFunction)
console.log(s)


// Но в классах стоит видимо защита от дурака, или принцип open-close
// и можно перезаписать только прототип экземпляра-объекта класса, но не прототип самого класса.

class ExampleClass {

}

ExampleClass.prototype = {   // Прототип класса не перезапишется, и даже не будет ошибок
    YYY: function() {       
        console.log('yyy')
    }
}

const w = new ExampleClass()  // Прототип объекта перезапишется
w.__proto__ = {
    WWW: function() {
        console.log('www')
    }
}

console.dir(ExampleClass)
console.log(w)

// Это похоже реализовано на уровне движка.
// Перезаписать не можем, но расширять протоип - мы всегда можем.





// Задание из домашки #4.
// Реализовать таски 01-03 через функции конструкторы в отдельном JS файле, реализовать наследование

function Animal(name = 'Animal') {
    this.name = name
}

Animal.prototype = {      // Мы можем добавлять методы не по одному, а все сразу
    constructor: Animal,  // Но для этого необходимо обязательно указать тут конструктор
    walk(){
        console.log(`${this.name} is walking`)
    },
    eat(){
        console.log(`${this.name} is eating`)
    },
    sleep(){
        console.log(`${this.name} is sleeping`)
    }
}

const fox = new Animal('fox')

console.log(fox)

// Пока что мы все реализовали ровно так же как и с классами, идем дальше.


// Явного механизма наследования в функциях-конструкторах нет.
// И поэтому приходится извращаться.

function Monkey(name) {
    return new Animal(name)  // Делать так
}

const x = new Monkey('makaka')

Monkey.prototype = {
    constructor: Monkey,

    roar(){
        console.log(`${this.name} is roaring`)
    },

    climb(){
        console.log(`${this.name} is climbing`)
    }
}

console.log(x) 

// Смотрим в прототип и видим, что новые методы roar() и climb() не добавились.

// Чтобы реализовать, чтобы это работало, необходимо воспользоваться Object.assign()

Monkey.prototype = Object.assign(Animal.prototype, {
    constructor: Monkey,

    roar(){
        console.log(`${this.name} is roaring`)
    },

    climb(){
        console.log(`${this.name} is climbing`)
    }
})

console.log(x) 

// Тогда мы увидим все методы в прототипе, все они будут на одном уровне.
// Через такой костыль делается наследование.