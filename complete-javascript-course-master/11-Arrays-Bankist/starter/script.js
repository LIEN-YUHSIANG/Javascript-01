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

const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = ''; // clean up the container first

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements; // Acceding order

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    // Create html template
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
  `;

    // Insert the new html template to the html file
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Compute the balance and display it
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// Display the movement summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // Only interest > 1 will be include.
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Compute account username for each account with .forEach() or .map()
// Use .forEach() when we need to perform sideeffect, and use .map() when we
// need a new array
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movement
  displayMovement(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (event) {
  // btns in a html form element is a submit btn which has a default behavoir of
  // reload the page, so we have to stop the default behaviour.

  // Another good thing about the btns in a form element is that, is we have
  // inputs in the input field, pressing the `enter` key will also auto trigger
  // the event.
  event.preventDefault(); // Prevent form from submitting

  // find the account using the .find()
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  // check the pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Disply UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // let the field loss focus

    // Update UI
    updateUI(currentAccount);
  }
});

// Implement transfer
btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // Clean up input field
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
  s;

  // Add check balance and the movement to the user and receiver
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username != currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Implement load btn
btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  // Clean up input field
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

// Implement close account function
btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  // Check the credential
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // Delete accoubnt
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

// btn sort
let sorted = false; // Keep track of the status

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted; // Change the status every time we click the btn
});

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

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (arr1, arr2) {
  // Perform shallow copy
  let julia2 = arr1.slice();
  let kate2 = arr2.slice();

  // Delete first and last two dog from julias array
  julia2.splice(0, 1);
  julia2.splice(-2);
  // julia2.slice(1, 3);

  let allData = julia2.concat(kate2);
  // let allData = [...julia2, ...kate2];

  allData.forEach(function (el, i) {
    if (el >= 3) {
      console.log(`Dog number ${i + 1} is an adult`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

// map method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// .map() will return a new array so we can bond it to a vairable.
const movementsUSD = movements.map(function (mov) {
  return Math.trunc(mov * eurToUsd);
});

// const movementsUSD = movements.map(mov => Math.trunc(mov * eurToUsd)); // Use arrow function

console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementsUSD); // [220, 495, -440, 3300, -715, -143, 77, 1430]
// for-of loop to perform same task
const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);


// Like forEach() map will pass (el, i, arr) as argument to the callback function
const movementsDescriptons = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`
);

console.log(movementsDescriptons);


// .filter() method
// filter the element that satisfied our test condition
// .filter also pass (element, index, array) to the callback function, but the 
// later two are rarely used.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposit = movements.filter(function (mov, i, arr) {
  return mov > 0;
  // We only need to return a boolean value, only the elements that makes the condition `true`
  // will be return and put into the new array
});
console.log(movements); // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(deposit); // [200, 450, 3000, 70, 1300]

// Use for-of loop to perform same task
const depositeFor = [];
for (const mov of movements) if (mov > 0) depositeFor.push(mov);
console.log(depositeFor); // [200, 450, 3000, 70, 1300]

const withdrawals = movements.filter(mov => mov < 0); // Use arrow function.
console.log(withdrawals);


// `.reduce()` methods
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// The first argument that pass to the callback function is not the current element,
// but a `accmulator`. The accumulator is like a snow ball that takes all the elements and
// eventually be returned.
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur; // This will be the new accumulator that will be use in the next iteration.
}, 0);

// Use arrow function
// const balance = movements.reduce((acc, cur) => acc + cur, 0);

console.log(balance);

// Perform same task by for-of loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Use .reduce() to get maximum value of a array
const maxValue = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]);

console.log(maxValue);
*/

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (arr) {
  // Create a new array using .map()
  const humanAge = arr.map(age => (age <= 2 ? age * 2 : age * 4 + 16));

  // Filter out the puppies
  const adultDogAge = humanAge.filter(age => age >= 18);
  console.log(humanAge);
  console.log(adultDogAge);

  const averageAdultDogAge =
    adultDogAge.reduce(function (acc, age) {
      return acc + age;
    }, 0) / adultDogAge.length;

  return averageAdultDogAge;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));


// Chaining methods

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// We can chain as much method as we want as long as the former method return a
// new array.

// PIPELINE to process data
const totalDepositesUSD = movements
  .filter(mov => mov > 0) // Return array, able to chain
  .map((mov, i, arr) => {
    // console.log(arr); // Check the return value in the pipline
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd) // Return array, able to chain
  .reduce((acc, mov) => acc + mov, 0); // Return value, can not chain anymore.
console.log(totalDepositesUSD);
*/

// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = arr =>
  arr
    .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// `.find()` method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// .find() will return the first value in the array that satisfied our condition.
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);
// `.filter()` return an array that contain all the elements that satisfied our
// condition, `.find()` only return the first element that satisfied the condition.

console.log(accounts);
// Use .find() to find a specific element is vary easy
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);


// The findIndex Method

// `.findIndex()` => Similar to .find() but this will return the element's index.
// Return the first element's index that satisfied our condition.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// .find() will return the first value in the array that satisfied our condition.
const firstWithdrawalIndex = movements.findIndex(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawalIndex); // 2


// some and every
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// `.some()`
// .include() can only check equality
console.log(movements.includes(-130));

// .some() can check if there is any element in the array satisfied our condition.
// Return a boolean value.
const anyDeposits = movements.some(function (mov) {
  return mov > 1500; //
});
console.log(anyDeposits); // true

// `.every()`
// similar to .some(), but only return true of all element in the array satisfied our condition.
console.log(movements.every(mov => mov > 0));

console.log(account4.movements.every(mov => mov > 0));

// Separate callback, we can declare the callback function outside the array methods and use it
// when we call the method
const deposite = mov => mov > 0;

console.log(movements.some(deposite)); // true
console.log(movements.every(deposite)); // false
console.log(movements.filter(deposite));


// flat and flatMap

// .flat()
// Remove the nested array and flatten the array
const arr = [[1, 2, 3], [4, 5, 6], 7, 8]; // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr.flat());

// .flat() can only go down one level of nested structre in default setting,
// but we can use depth argument to specify how many level we want to flatten.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(1)); // [[1, 2], 3, 4, [5, 6], 7, 8]
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance); // 17840

// .flatMap()
// combinde the flat and map method
// flatMap can only go one level deep, deeper than that use flat method
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2); // 17840


// Sorting Arrays
// `.sort()` method does the sorting base on strings.

// With strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // ["Adam", "Jonas", "Martha", "Zach"]
console.log(owners); // ["Adam", "Jonas", "Martha", "Zach"]
// The original array will be mutate

// With Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// return < 0, A, B
// => If return less than 0, value A will be sorted befor value B (STAY THE SAME)
// return > 0. B, A
// => If return larger than 0, value A will be sorted after Value B (Switch order)

// Accending
// console.log(
//   movements.sort((a, b) => {
//     // Sort accending => samll to large
//     if (a > b) return 1; // if a > b rotate
//     if (b > a) return -1; // if b > a stay the same
//   })
// );
console.log(movements.sort((a, b) => a - b));
console.log(movements);

// Decending
// console.log(
//   movements.sort((a, b) => {
//     // Sort decending => samll to large
//     if (a > b) return -1; // if a > b rotate
//     if (b > a) return 1; // if b > a stay the same
//   })
// );
console.log(movements.sort((a, b) => b - a));
console.log(movements);


// More way to create and filling arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// This will create a empty array with 7 empty element.
const x = new Array(7);
console.log(x); // []
console.log(x.length); // 7

// We cannot use .map() to fill it
// Empty arrays + fill method
console.log(x.map(() => 5)); // []

// Use fill() to fill this kind of array that contain empty elements
x.fill(1);
x.fill(1, 3, 5);
console.log(x); // [1, 1, 1, 1, 1, 1, 1]

arr.fill(23, 2, 6);
console.log(arr); // [1, 2, 23, 23, 23, 23, 7]

// Array.from() function
// The first argument is to specified the length of array,
// the second argument is a callback function which specify the element we want to put in,
// the call back funtion inside it is just like .map() method.
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); // [1, 2, 3, 4, 5, 6, 7]

// Create an array that contain 100 random dice roll
const hundredDice = Array.from(
  { length: 100 },
  (_, i) => (_ = Math.trunc(Math.random() * 6 + 1))
);
console.log(hundredDice);

// Real Usage of Array.from() function

// Retrieve data that only be store in the DOM and make it into an array

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});


// Example of array methods

// 1.
const bankDepositeSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur);
console.log(bankDepositeSum);

// 2.
// const numDeposite100 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov >= 1000).length;

// Use reduce
const numDeposite1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);

console.log(numDeposite1000);

// ++ will return the previous value first
let a = 10;
console.log(a++); // 10
console.log(a); // 11
console.log(++a); // Use prefix ++

// 3.
const { deposits, withdrawal } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawal += cur);
      // return sums;
      sums[cur > 0 ? 'deposits' : 'withdrawal'] += cur;
      return sums;
    },
    { deposits: 0, withdrawal: 0 }
  );

console.log(deposits, withdrawal);

// 4.
// this is a nice title => This Is a Nice Title

const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a long title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
const addRecFood = function (dogs) {
  dogs.forEach(function (dog, i, object) {
    dog.recFood = dog.weight ** 0.75 * 28;
    console.log(dog.recFood);
  });
};

addRecFood(dogs);

// 2.
const toMuchLittle = function (dogs) {
  dogs.forEach(function (dog, i, object) {
    if (dog.owners.includes('Sarah')) {
      dog.curFood > dog.recFood
        ? console.log('Too much')
        : console.log('Too little');
    }
  });
};

toMuchLittle(dogs);

// 3.

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];

// const addToOwners = function (dogs) {
//   dogs.forEach(function (dog, i, object) {
//     dog.curFood > dog.recFood
//       ? ownersEatTooMuch.push(dog.owners)
//       : ownersEatTooLittle.push(dog.owners);
//   });
// };

// addToOwners(dogs);
// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// 4.
console.log(`${ownersEatTooMuch.join(' and ')}'s dos eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dos eat too little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.

const checkEatingOk = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOk));

// 7.
console.log(dogs.filter(checkEatingOk));

// 8.

// Create a copy
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
