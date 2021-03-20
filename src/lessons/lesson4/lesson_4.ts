console.log('lesson 4');

// http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/


// Task 01
// Создайте промис, который постоянно находиться в состоянии pending.
// В конструкторе промиса выведите в консоль сообщение "Promise is created".

const p = new Promise((res, rej) => {
    console.log('Promise is created')
})

console.log(p)


// Task 02
// Создайте промис, который после создания сразу же переходит в состояние resolve
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль

const p2 = new Promise((res, rej) => {
    res('Promise Data 2')
})
p2.then((resp) => console.log(resp))

console.log(p2)


// Task 03
// Создайте промис, который после создания сразу же переходит в состояние rejected
// и возвращает строку 'Promise Error'
// Получите данные промиса и выведите их в консоль

const p3 = new Promise((res, rej) => {
    rej('Promise error 3')
})
p3.catch((err) => console.log(err))

console.log(p3)


// Task 04
// Создайте промис, который переходит в состояние resolved через 3с.
// (Используйте setTimeout)
// и возвращает строку 'Promise Data'
// Получите данные промиса и выведите их в консоль


// Интересный момент !!! (то как работает консоль разработчика)
// В консоли если сразу нажать на объект promise будет внутри состояние pending
// А если мы подождем 3 секунды и дождемся пока в консоли выведется 'Promise Data 4', а затем 
// нажмем на объект promise, то увидим состояние fullfield.

const p4 = new Promise((res) => {
    setTimeout(res, 3000, 'Promise Data 4') // Третим аргументом в setTimeout может быть то, что необходимо передать в фунцию (res)
})
p4.then((resp) => console.log(resp))

console.log(p4)

// Task 05
// Создайте литерал объекта handlePromise со следующими свойствами:
// promise, resolve, reject, onSuccess, onError
// Проинициализируйте первые три свойства null,
// а последние два функциями, которые принимают один параметр и выводят
// в консоль сообщения: первая - `Promise is resolved with data: ${paramName}`
// вторая - `Promise is rejected with error: ${paramName}`
// Создайте три обработчика события click для кнопок "Create Promise", "Resolve Promise", "Reject Promise".
// Первый обработчик, создает промис, заполняет первые три свойства,
// описаного выше объекта: свойство promise получает новый созданный промис,
// свойства resolve и reject получают ссылки на соответствующие функции
// resolve и reject. Следующие два обработчика запускают методы resolve и reject.

export type TestObjType = {
    promise: null | Promise<any>
    resolve: null | Function
    reject: null | Function
    onSuccess: (paramName: string) => void
    onError: (paramName: string) => void
}

export const handlePromise: TestObjType = {
    promise: null,
    resolve: null,
    reject: null,
    onSuccess: (paramName: string) => console.log(`Promise is resolved with data: ${paramName}`),
    onError: (paramName: string) => console.log(`Promise is rejected with error: ${paramName}`)
}

export const createPromise = () => {
    const p = new Promise((res, rej) => {
        handlePromise.resolve = res
        handlePromise.reject = rej
    })
    handlePromise.promise = p
    handlePromise.promise
    .then((res) => {
        handlePromise.onSuccess(res)
    })
    .catch((err) => {
        handlePromise.onError(err)
    })
}

export const resolvePromise = () => {
    handlePromise.resolve && handlePromise.resolve('success')
}

export const rejectPromise = () => {
    handlePromise.reject && handlePromise.reject('error')
}



// Task 06
// Создайте промис, который через 1 с возвращает строку "My name is".
// Создайте функцию onSuccess, которая получает один параметр,
// прибавляет к нему Ваше имя и возвращает новую строку из функции
// Создайте функцию print, которая выводит в консоль значение своего параметра
// Добавьте два метода then и передайте созданные функции.

const onSuccess = (about: string): string => {
    return `${about} Kirill`
}

const print = (string: string): void => {
    console.log(string)
}

const p6: Promise<string> = new Promise((res) => {
    setTimeout(() => res('My name is'), 2000)
})

p6.then((resp) => onSuccess(resp)).then((resp) => print(resp))


// Task 7
// Создайте три промиса. Первый промис возвращает объект { name: "Anna" } через 2с,
// второй промис возвращает объект {age: 16} через 3 с, а третий {city: ''} через 4с.
// Получите результаты работы промисов, объедините свойства объектов
// и выведите в консоль {name, age, city}

const promise1: Promise<Object> = new Promise((res) => {
    setTimeout(() => res({name: 'Ann'}), 2000)
})

const promise2: Promise<Object> = new Promise((res) => {
    setTimeout(() => res({age: 16}), 3000)
})

const promise3: Promise<Object> = new Promise((res) => {
    setTimeout(() => res({city: ''}), 4000)
})

const result: Promise<Array<Object>> = Promise.all([promise1, promise2, promise3])
result.then((arr) => {
    let obj = {}
    arr.forEach((el) => {
        obj = {...obj, ...el}
    })
    return obj
})
.then((result) => console.log(result))

// или так с помощью какой-то непонятной деструктуризации.
// result.then(([a, b, c]) => ({...a, ...b, ...c})).then(console.log)



// just a plug
export default ()=>{};