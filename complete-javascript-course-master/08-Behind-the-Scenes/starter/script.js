'use strict';
/*
function calcAge(birthYear) {
	const age = 2037 - birthYear;

	function printAge() {
		let output = `${firstName}, you are ${age}, born in ${birthYear}`;
		console.log(output);

		if (birthYear >= 1991 && birthYear <= 1996) {
			var millenial = true;
			// Creating NEW variable with same name as
			// outer scope's variable
			const firstName = 'Steven';

			// Reassigning outer scope's variable
			output = 'NEW OUTPUT';

			const str = `Oh, and you're a millenial, ${firstName}`;
			console.log(str);

			function add(a, b) {
				return a + b;
			}
		}
		// console.log(str);
		console.log(millenial);
		// console.log(add(2, 3));
		console.log(output);
	}
	printAge();

	return age;
}

const firstName = 'Jonas';
calcAge(1991);
// printAge();

// Hoisting with variable
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'Student';
const year = 1991;

// Hoisting with function

console.log(addDecl(2, 3));
// We can call the unction declaration before its defined in the code.

// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));
//* Since function expression and arrow function is just
//* like variables it'll be store in TDZ if declared by `const`,`let`
//* before defined, or be undefined if declared by `var`,
//* and cannot be use before declaration.

function addDecl(a, b) {
	return a + b;
}

const addExpr = function (a, b) {
	return a + b;
};

const addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
if (!numProducts) deletShoppingCart();

var numProducts = 10;

function deletShoppingCart() {
	console.log('All product deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//! Variables declared with `var`, will create a property on
//! the global window object.


// This keyword

console.log(this);

const calcAge = function (birthYear) {
	console.log(2037 - birthYear);
	console.log(this);
};
calcAge(1991);

const calcAgeArrow = birthYear => {
	console.log(2037 - birthYear);
	console.log(this);
};
calcAgeArrow(1991);

const jonas = {
	year: 1991,
	calcAge: function () {
		console.log(this);
		console.log(2037 - this.year);
	},
};
jonas.calcAge();

const metilda = {
	year: 2017,
};

metilda.calcAge = jonas.calcAge;
metilda.calcAge();

const f = jonas.calcAge;
f(); // this keyword of a independent function call is undefined.


var firstName = 'Matilda';

const jonas = {
	firstName: 'Jonas',
	year: 1991,
	calcAge: function () {
		console.log(this);
		console.log(2037 - this.year);

		// Solution 1
		// const self = this;
		// const isMillenial = function () {
		// 	console.log(self);
		// 	console.log(self.year >= 1981 && self.year <= 1996);
		//     // console.log(this.year >= 1981 && this.year <= 1996);
		// };

		// Solution 2
		const self = this;
		const isMillenial = () => {
			console.log(self);
			console.log(this.year >= 1981 && this.year <= 1996);
		};
		isMillenial();
	},

	greet: () => console.log(`Hey ${this.firstName}`),
	// Arrow function does not have a this keyword.
	// And object literal doesn't create its own block
	// but still in global scope, so this keyword will point to
	// global scope window.
};
jonas.greet();
jonas.calcAge();
// Since arrow function does not have this keyword
// this line of code will point to glocal scope

// Argument keyword
const addExpr = function (a, b) {
	console.log(arguments);
	return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
	console.log(argument);
	a + b;
};
addArrow(2, 5, 8);

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
	name: 'Jonas',
	age: 30,
};

const friend = me;
friend.age = 27;
console.log('Friend', friend);
console.log('Me', me);
*/

// Primitive type
let lastName = 'Lien';
let oldLastName = lastName;

lastName = 'Davis';
console.log(lastName, oldLastName); // Davis, Lien
// When we attempt to copy the original primitive, it will point to the same memory
// address in the call stack and when changing, it will create a new address in the
// call stack that hold different value. So the original address stay the same.

// Reference type
const jessica = {
	firstName: 'Jessica',
	lastName: 'Williams',
	age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before marrigae', jessica);
console.log('After marrigae', marriedJessica);

// When we attempth to copy the original object, it will not create a new object
// in the heap, but just another variable in the stack, which hold the reference to
// the original object. So both old and new variable point to the same memory address
// in the heap. So when change the new variable, the old will be change too.
// Since they are point to the same address

// Copying object
const jessica2 = {
	firstName: 'Jessica',
	lastName: 'Williams',
	age: 27,
	family: ['Alice', 'Bob'],
};

const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marrigae', jessica2);
console.log('After marrigae', jessicaCopy);
// Since object.assign() only perform shallow copy, the second level objects in the
// two objects are still pointing to the same address in the heap, so both the
// original and new family array will be mutate.
