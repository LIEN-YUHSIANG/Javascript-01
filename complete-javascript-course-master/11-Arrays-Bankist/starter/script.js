'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
// Array methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// .slice() method => this will return a new array
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2));
// Perform a shallow copy of array using `.slice()` method
console.log(arr.slice());
console.log([...arr]); // We can also use spread to perform shallow copy

// .splice() method => similar to .slice() but this will extarct from the original array,
// and thus the original array will be mutate.
// console.log(arr.splice(2)); //["c", "d", "e"]
console.log(arr); // ["a", "b"]
// .splice() are usually use to delete elements from array
// index is also different from .slice(), the first argument will be the start index, and
// the second argument will be the number of elements we what to delete.
arr.splice(-1);
console.log(arr); // ["a", "b", "c", "d"]
arr.splice(1, 2);
console.log(arr); // ["a", "d"]

// .reverse() => reverse the array, this will mutate the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ["f", "g", "h", "i", "j"]
console.log(arr2); // ["f", "g", "h", "i", "j"]

// .concat(), this will concat / bind two array together, this will not mutate the original array
const letters = arr.concat(arr2);
console.log(letters); // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
// Use spread to bund array together, this will not mutate the original too.
console.log([...arr, ...arr2]);

// .join() => just like join for strings
console.log(letters.join('-')); //a-b-c-d-e-f-g-h-i-j


// The new at Method

// .at()
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); // Retrieve the value by .at() method instead of braket notation.

// Different way to get the last elemet of array
console.log(arr[arr.length - 1]);
console.log(arr[-1]); // braket notation in JS do not support negative index.
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // Use at and we can use the index just like in .slice() method
console.log('Jonas'.at(0)); // .at() also works on strings

// Looping arrays: .forEach() method

// .forEach() => Use to loop over arrays

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Use for-of statement to loop over arrays
// for (let movement of movements) {
for (const [i, movement] of movements.entries()) {
  // Access the index also
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
  }
}

// Use .forEach() to perform the same task
// `.forEach()` method will loop over the array, and in each iteration, it will execute the
// call back function we pass to it. Also, as the .forEach() method calls the callback function
// in each iteration, it will pass in the current element and the index of the array, and the
// entire original arrray as arguments in the exact order of (element, index, arr), and we can 
// only specify the one we want to use.
movements.forEach(function (mov, i, arr) {
  // forEach will pass these argument in this exact order.
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdraw ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// ...


// forEach with maps and sets

// With map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// .forEach() will pass (value, key, map) of a map to the callback function in the exact order.
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});
// USD: United States dollar 
// EUR: Euro 
// GBP: Pound sterling 

// With set
const currenciesUnique = new Set([
  'USD',
  'GBP',
  'USD',
  'EUR',
  'EUR',
  'NTD',
  'JPY',
]);
console.log(currenciesUnique);

// .forEach() will pass (value, value, set) of a set to the callback function in the exact order.
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${_}: ${value}`);
});
// The first and second argument that .forEach pass to the callback function is all the value,
// since sets do not have keys or indexs
// USD: USD 
// GBP: GBP 
// EUR: EUR 
// NTD: NTD 
// JPY: JPY 
*/
