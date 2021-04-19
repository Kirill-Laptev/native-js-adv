// Task 1
// Есть некоторая строка (const str = 'fgfggg';), что будет, если мы возьмем str[0]

// 'f'
// Потому что когда мы обращаемся к элементу строки, то под капотом происходит преобразование
// строки в псевдомассив new String('fgfggg')
// Это получается как бы объект с парами ключ-значение, где ключ является числом, а значение строкой (буквой)

console.log(new String('fgfggg'))

// То есть примитивы являются под капотом объектами, это правда.
// Еще примеры этого :

console.log(new Number(5))
console.log(new Boolean(true))




// Task 2
// Реализуйте необходимый код, что бы выражение (2).plus(3).minus(1) сработало и вернуло 4

Number.prototype.plus = function(value){
	return this + value
}

Number.prototype.minus = function(value){
	return this - value
}

console.log((2).plus(3).minus(1))

// this будет являться число на котором вызывается метод .plus()
// Почему число 2 находится в скобках (2) ???
// Это просто сделано, чтобы запутать. 
// Кажется что это вызов функции, на самом же деле это просто код, который находится в скобках,
// например как и выражение :
// (a + b)




// Task 3
// Реализуйте функцию, которая принимает следующие аргументы (строки) '*', '1', 'b', '1c', и возвращает строку '1*b*1c'

const getStr = (star, ...args) => {
	return args.reduce((acc, el, i) => {
		if(i !== args.length - 1){
			return acc + el + star
		}
		return acc + el
	}, '')
}

console.log(getStr('*', '1', 'b', '1c'))

// Другое решение :

function getStrWithStars() {
	return [].slice.call(arguments, 1).join(arguments[0])
}

console.log(getStrWithStars('*', '1', 'b', '1c'))

// Что тут происходит ?
// Тут говорится - вызови метод slice у псевдомассива arguments.
// То есть такой хитрой штукой мы от обычного массива крадем метод slice для псевдомассива arguments.
// Далее, среж нам все элементы псевдомассива со второго, то есть звездочку мы пропускаем.
// slice вернет массив значений без звездочки. Этот массив мы склеиваем в строку с помощью звездочки.
// И все.


// Мой вариант второй.
// Более простой.

const getStrWithStars2 = (...args) => {
	const star = args[0]
	return args.slice(1).join(star)
}

console.log(getStrWithStars2('*', '1', 'b', '1c'))





// Task 4
// Напишите функцию которая найдет сумму всех вершин в структуре данны типа tree
// 1) Рекурсивно
// 2) В цикле

const tree = {
	valueNode: 3,
	next: [{
		valueNode: 1,
		next: null
	},
		{
			valueNode: 3,
			next: null
		},
		{
			valueNode: 2,
			next: null
		},
		{
			valueNode: 2,
			next: [
				{
					valueNode: 1,
					next: null
				},
				{
					valueNode: 5,
					next: null
				}
			]
		}]
};


// Рекурссия
const countBranches = (t) => {
	 let sum = 0

	 const helper = (tree) => {
		sum += tree.valueNode

		if(tree.next !== null){
			tree.next.forEach((item) => {
				return helper(item)
			})
		}
	 }

	 helper(t)
	 return sum
}

console.log(countBranches(tree))





// Task 5
// исправить код, что бы работал правильно

for (var i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log('i', i);
	}, 100);
}

// 1)
for (let i = 0; i < 10; i++) {
	setTimeout(function () {
		console.log('i', i);
	}, 100);
}

// 2)
for (let i = 0; i < 10; i++) {
	setTimeout(console.log.bind(null, i), 100);
}

// сonsole - это объект,  log - это функция. Эту функцию мы можем забиндить.
// Привязывать можно не только объект в качестве контекста, но и аргументы.




// Task 6
// Реализуйте функцию Foo, что бы все корректно работало

function Book(name, author) {
	this.name = name;
	this.author = author;
	return this;
}


function Foo(C, name, author){
	return new C(name, author)
}

var book = Foo(Book, 'js', 'petr');
console.log(book.name);




// Task 7
// Реализовать функцию f: f(2, 3) -> 5, при вызове f(2)(3), тоже вернет 5

const sumNumbers2 = (a, b) => {
	if(b !== undefined){
		return a + b
	} else{
		return (c) => {
			return a + c
		}
	}
}

console.log(sumNumbers2(2, 3))
console.log(sumNumbers2(2)(3))




// Task 8
// Реализовать функцию f: f(1)(2)(3)() -> 6, f(0)(3)(1)(5)() -> 9

const chainSum = (n1) => {
	let result = n1
	
	return function add(n2) {
	  if(n2 !== undefined){
		result += n2
		return add
	  }
	  return result
	}
  }

  console.log(chainSum(1)(2)(3)()) // 6 
  console.log(chainSum(0)(3)(1)(5)()) // 9




// Task 9
// Реализовать функции seven, plus, one, five, minus, two так, что бы следующие вызовы работали seven(plus(one())) -> 8. five(minus(two())) -> 3




// Task 10
// Реализовать функцию сортировки массива пузырьком


const bubleSort = (arr) => {
	for(let j = 0; j < arr.length; j++){
		let isSwap = false
	
		for(let i = 0; i < arr.length - j - 1; i++){
			if(arr[i] > arr[i + 1]){
				let temp = arr[i]
	
				arr[i] = arr[i + 1]
				arr[i + 1] = temp
				isSwap = true
			}
		}
	
		if(!isSwap) break
		
	}
	return arr
}


console.log(bubleSort([38, 0, 7, 10, 9, 8, 7, 11]))

// Task 11
// Есть строка, состоящая из разных скобок - str = "())({}}{()][][", написать функцию проверки закрыты ли все.

// const checkOnClosed = (str) => {
// 	let result = []
// 	let arr = str.split('')
// 	for(let i = 0; i < arr.length - 1; i += 2){
// 		if(arr[i] === '(' || arr[i] === '[' || arr[i] === '{'){
// 			if(arr[i + 1] === ')' || arr[i] === ']' || arr[i] === '}'){
// 				result = [...result, 'true']
// 			}
// 		} else {
// 			result = [...result, 'false']
// 		}
// 	}
// 	return !result.includes('false')
// }

// console.log(checkOnClosed("())({}}{()][]["))
// console.log(checkOnClosed("(){}[]"))


const checkOnClosed = (str) => {
	const config = {
		'(': ')',
		'[': ']',
		'{': '}'
	}

	const helper = (str) => {
		if(str.length === 0) return true  // Слева-направо будем удалять скобки до тех пор пока строка не станет пстой
		if(str.length % 2 !== 0) return false // Если длина строки нечетная, то это уже говорит о том, 
											  // что скобки где-то не закрыты. Или когда мы удалили скобки осталась одна лишняя.

		const isOpenBrackets = (char) => Object.keys(config).includes(char)
		const getClosingBracket = (char) => config[char]

		for(let i = 0; i < str.length; i++){
			if(isOpenBrackets(str[i]) && getClosingBracket(str[i]) === str[i + 1]){
				let newString = `${str.slice(0, i)}${str.slice(i + 2)}`
				console.log('newString', newString)
				return helper(newString)
			}
		}
		return false
	}
	return helper(str)  // Первый вызов функции helper
}

console.log(checkOnClosed("())({}}{()][]["))

// Тут важно понимать условие. Условие говорит о том, что если такой символ существует в массиве ключей,
// И у этого символа закрывающий символ равен следующему символу(то есть следующий символ является закрывающим), 
// то выполняем такую логику :

// Если условие срабатывает - обрезаем строку эти два символа, возвращаем функцию helper с новой строкой.
// Если условие не срабатывает, то проверяются следующие символы, если следующие символы будут открывающим и закрывающим, 
// то опять же сработает условие эти символы вырежутся из строки.
// В конце когда условия в цикле не срабатывают, то возвращаем false.
// true сработает если мы удалили все символы, и строка осталось пустой (тогда она имеет у каждой скобки - закрывающую скобку)




// Task 12
// Необходимо написать функцию, принимающую в аргументах массив целых чисел и возвращающую новый массив, состоящий только из уникальных значений первого массива.

// Первый вариант
const getNonRepeatNumbers = (arr) => {
	return arr.filter((el, index) => {
		return arr.indexOf(el) === index
	})
}

console.log(getNonRepeatNumbers([1, 2, 1, 4, 5, 4, 9, 0]))

// Второй вариант 
const getNonRepeatNumbers2 = (arr) => {
	let obj = {}

	arr.forEach((item) => { // Если будут встречаться одинаковые числа, то они будут перезаписыватьс в виде ключей
		obj[item] = ''
	})

	return Object.keys(obj).map((el) => Number(el))
}

console.log(getNonRepeatNumbers2([1, 2, 1, 4, 5, 4, 9, 0]))



// Task 13
// Написать функцию, принимающую аргументом массив чисел и возвращающую новый массив, состоящий из удвоенных значений первого.
// f([1, 2, null, 7, 8, null, 3]); // => [2, 4, 14, 16, 6]

const getDoubleNum = (arr) => {
	return arr.filter((el) => el !== null).map((el) => el * 2)
}

console.log(getDoubleNum([1, 2, null, 7, 8, null, 3]))

// Через один .map() не получится, так как если ставить условие, которое отсечет значение в массиве - вернется undefined.
// Можно так же решить с пощью reduce.


// Определяем перфоманс работы функции
// (() => {
// 	const start = new Date()
// 	console.log(getDoubleNum([1, 2, null, 7, 8, null, 3]))
// 	const end = new Date()
// 	console.log('perfomance', end - start)
// })()






// Task 14
// Необходимо написать функцию, возвращающую значения всех вершин дерева
// getTreeValues(tree); // => [1, 2, 3, 4, 5, 6, 7]

const tree2 = {
	value: 1,
	children: [
		{
			value: 2,
			children: [
				{ value: 4 },
				{ value: 5 },
			]
		},
		{
			value: 3,
			children: [
				{ value: 6 },
				{ value: 7 },
			]
		}
	]
};

// const getAllValues = (tree) => {
// 	let result = []

// 	const helper = (t) => {

// 		result.push(t.value)

// 		if(t.children){
// 			t.children.forEach((item) => {
// 				return helper(item)
// 			})
// 		}
		
// 		console.log(result)
// 	}
// 	helper(tree)
// 	return result
// }

// console.log(getAllValues(tree2))

function getTreeValues(tree) {
	let values = [ tree.value ];

	if (Array.isArray(tree.children)) {
		tree.children.forEach(item => values = values.concat(getTreeValues(item)));
	}

	return values;
}

console.log(getTreeValues(tree2))



// Task 15
// Необходимо написать функцию, возвращающую сумму всех вершин дерева из Task 14

const tree3 = {
	value: 1,
	children: [
		{
			value: 2,
			children: [
				{ value: 4 },
				{ value: 5 },
			]
		},
		{
			value: 3,
			children: [
				{ value: 6 },
				{ value: 7 },
			]
		}
	]
};

// Не работает и никогда не сработает правильно (через рекурссию не сделать)
// const getTreeValuesSum = (tree) => {
// 	let sum = 0

// 	const helper = (t) => {
// 		sum += t.value
// 		if(t.children){
// 			t.children.forEach((item) => {
// 				return helper(item)
// 			})
// 		}
// 	}

// 	helper(tree)
// 	return sum
// }


// Первый вариант
// function getTreeValues(tree) {
// 	const tmpTree = [tree];
// 	const res = [];
// 	let current;

// 	while (tmpTree.length > 0) {
// 		current = tmpTree.shift();
// 		res.push(current.value);

// 		if (current.children) {
// 			current.children.forEach(item => tmpTree.push(item));
// 		}
// 	}

// 	return res
// }

// Второй вариант (точно такой же, чуть понятнее)
function getTreeValuesSum(tree){
	const result=[];
	const stack=[tree];
	let current;

	while(stack.length){
		current = stack.shift();
		console.log(current)
		result.push(current.value);
		if(current.children){
			stack.push(...current.children);
		}
   }
   
   return result;
   
   }


console.log(getTreeValuesSum(tree3))




// Task 16
// Надо реализовать «бомбу» (в виде функции-конструктора), которая получает на входе время, через которое взорвется и
// некоторый «звук взрыва» (строку, которую вернет через заданное время).

function Bomb(message, delay) {
	this.message = message
	setTimeout(this.blowUp.bind(this), delay * 1000)
}

Bomb.prototype.blowUp = function(){
	console.log(this.message)
}

new Bomb('booom', 5)




// Task 17
// Необходимо реализовать функцию, принимающую в аргументах строку, состоящую из букв и вернуть новую строку,
// в которой повторяющиеся буквы заменены количеством повторений.
// rle('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD'); // => 'AV3B3V2XDHJF4D6HA4J3D2SLS3D4'

const getLetterCount = (str) => {
	const arr = str.split('')
	let result = []
	let temp = 1

	for(let i = 0; i < arr.length; i++){
		if(arr[i] === arr[i + 1]){
			temp += 1
		} else {
			result.push(arr[i] + temp)
			temp = 1
		}
	}

	return result.join('')
}

console.log(getLetterCount('AVVVBBBVVXDHJFFFFDDDDDDHAAAAJJJDDSLSSSDDDD'))




// Task 18
// Реализуйте функцию isSorted(), которая возвращает true или false в зависимости о того, отсортирован ли переданный ей числовой массив.

const isSorted = (arr) => {

	let startArr = [...arr]

	let sortedArr = arr.sort((a, b) => {
		return a - b
	})

	let result = sortedArr.map((el, index) => {
		if(el === startArr[index]){
			return true
		}
		return false
	})

	return !result.includes(false)
}

console.log(isSorted([10, 1, 7, 9, 0, 8, 52, 9]))


// Есть более простой вариант
const isSorted2 = (arr) => {
	if(arr.length <= 1) return true
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > arr[i + 1]){
			return false
		}
		return true
	}
}





// Task 19
// Реализуйте функцию missing(), которая принимает неотсортированный массив уникальных чисел (то есть, числа в нём не повторяются)
// от 1 до некоего числа n, и возвращает число, отсутствующее в последовательности. Там может быть либо одно отсутствующее число,
// либо их может не быть вовсе.
// missing([])                         // undefined
// missing([1, 4, 3])                  // 2
// missing([2, 3, 4])                  // 1
// missing([5, 1, 4, 2])               // 3
// missing([1, 2, 3, 4])               // undefined


const missing = (arr) => {
	if(arr.length === 0) return undefined

	arr.sort((a, b) => {
		return a - b
	})

	for(let i = 1; i < arr.length; i++){
		if(arr[i - 1] !== i){
			return i
		}
	}
	return undefined
}

console.log(missing([]))                         // undefined
console.log(missing([1, 4, 3]))                  // 2
console.log(missing([2, 3, 4]))                  // 1
console.log(missing([5, 1, 4, 2]))               // 3
console.log(missing([1, 2, 3, 4]))               // undefined





// Task 20
// Реализуйте класс LinkedList, не используя встроенные массивы JavaScript ( [] ). Ваш LinkedList должен поддерживать лишь 2 метода: add() и has().
// class LinkedList {...}
// let list = new LinkedList(1, 2, 3)
// list.add(4)                           // undefined
// list.add(5)                           // undefined
// list.has(1)                           // true
// list.has(4)                           // true
// list.has(6)                           // false

class LinkedList{
	constructor(...args){
		this.args = args
	}

	has = (num) => {
		if(this.args.includes(num)){
			return true
		}
		return false
	}

	add = (num) => {
		this.args.push(num)
	}
}


const list = new LinkedList(1, 2, 3)
console.log(list.add(4))                           // undefined
console.log(list.add(5))                           // undefined
console.log(list.has(1))                           // true
console.log(list.has(4))                           // true
console.log(list.has(6))  						   // false



// Task 21
// Что выведет консоль?

Promise
	.resolve()
	.then(() => console.log(1))
	.then(() => console.log(2))
	.then(() => console.log(3));

Promise
	.resolve()
	.then(() => console.log(4))
	.then(() => console.log(5))
	.then(() => console.log(6));


// 1, 4, 2, 5, 3, 6