'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-09-29T23:36:17.929Z',
    '2023-10-05T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

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
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Create logout timer
const startLogOutTimer = function () {
  const tick = () => {
    const minute = String(Math.floor(time / 60)).padStart(2, 0);
    const second = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${minute}:${second}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// Experimenting API
const now = new Date();
const options = {
  // Specify the options
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'short',
};
// Get use locale
const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date
    const now = new Date();
    const options = {
      // Specify the options
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'short',
    };
    // Get use locale
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const minute = `${now.getMinutes()}`.padStart(2, 0);
    // // day/month/year

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Call log out timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
console.log(23 === 23.0);

console.log(0.1 + 0.2); // 0.30000000000000004

// Conver to `number` type
console.log(Number(`23`));
console.log(+23);

// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));

console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

// Checking if a value is NaN, this is not the perfect way to check if a value is a number, since the
// string is also not NaN
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(23 / 0)); // false

// Better way to check whether sth is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true
console.log(Number.isInteger(23 / 0)); // false

// Other Math name space method and object
// Suqreroot
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2)); // Won't work

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10') ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);

// Generalize the creating random number
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding integers - the following method also perform type coersion
// Remove the decimal part
console.log(Math.trunc('23.3'));
// Round to the nearist intefer
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); //24
// Round up
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil('23.9')); // 24
// Round down
console.log(Math.floor(23.3)); // 23
console.log(Math.floor(23.9)); // 23

// Rounding decimals
// Round to the decimal number we want, this will convert to string
console.log((2.7).toFixed(0)); // 3''
console.log((2.7).toFixed(3)); // '2.700'
console.log((2.345).toFixed(2)); // '2.35'
console.log(+(2.345).toFixed(3)); // 2.345


// Remainder Operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5
console.log(8 % 3); // 2
console.log(8 / 3); // 2.66666666665

// check even num
console.log(6 % 2 === 0); // true
console.log(7 % 2 === 0); // false

const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); //false
console.log(isEven(514)); // true

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});


// Numeric Separators
// Simply some underscores that we can place anywhere we want in numbers,
// and will not affect the operation of the number

// 287,460,000,000
const diameter = 287_460_000_000; // The `_` will not be print out
console.log(diameter); // 287460000000

const price = 345_99;
console.log(price); // 34599

const transferFee1 = 15_00;
const transferFee2 = 1_500;

// We can only put `_` between two number, not infrot, not behind
// Also we can't use two `_` in a row
const PI = 3.14159;
console.log(PI);

// This will not work when we want to convert a string to number
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230


// Working with BigInt

console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// When dealing with a big number that is beyond the original capacity
// of Js, use BigInt type, we can store any number as big as we want

// Ways to create BigInt number
console.log(349481981981222717821787121823718n); // Convert to a BigInt number
console.log(BigInt(34948198198122));

// Operations, all operations still works but we can't mix BigInt with
// regular number except comparison operator and `+`
// Math operation also won't works
console.log(10000n + 10000n);
console.log(10000n * 108787817391287912719283712897918000n);
// console.log(Math.sqrt(16n));

const huge = 23198371973891273193782n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 2); // true
console.log(20n === 20); // false
console.log(typeof 20n); // bigint
console.log(20n == 20); // true

console.log(huge + ' is really big');

// Division, bigints are integer, when peforming divisionm it will return
// the nearist integer
console.log(10n / 3n);
*/

// Date, Time

// Create a date, 4 ways
/*
// 1. Using the new Date() to get the current time
const now = new Date();
console.log(now);

// 2. Passing a string manually to the new Date()
console.log(new Date('Fri Oct 06 2023 19:06:29'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

// 3. passing the year, month, date, hour, minute, second
console.log(new Date(2037, 10, 29, 15, 23, 5)); // month is 0 base
// Js will auto corret the date
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037 00:00:00 GMT+0900 (日本標準時間)
console.log(new Date(2037, 10, 35)); // Sat Dec 05 2037 00:00:00 GMT+0900 (日本標準時間)

// 4. Passing the ammount of milisecond have passed since the Unix time
// 1970/01/01
console.log(new Date(0)); // Thu Jan 01 1970 09:00:00 GMT+0900 (日本標準時間)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // Sun Jan 04 1970 09:00:00 GMT+0900 (日本標準時間)


// Date time are also objects with special methods
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth()); // This is 0 base, 10 === Nov
console.log(future.getDate()); // get the actual date
console.log(future.getDay()); // Weekdays, e.g., monday...
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());

console.log(future.toISOString()); // Get nice format string
console.log(future.getTime()); // Get time stemp (The milisecond that have passed since unix time)

console.log(new Date(2142224580000));
console.log(Date.now()); // Get Current time stemp

// Set time manually, got it for year, month, date, day, hours, minutes, seconds
future.setFullYear(2040);
console.log(future);


// Operation with Dates

// We can subtract one day from another day, since the date is calculate by the time stamp
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);


// Internationalizing Numbers
const num = 3884764.23;

const options2 = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR', // We have to set currency manually
  // useGrouping: false,
};

console.log('US: ', new Intl.NumberFormat('en-US', options2).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options2).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options2).format(num)
);


// Timers

// setTimeout()
// This run asynchronously

const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => {
    console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕🍕`);
  },
  3000,
  ...ingredients
);
console.log('Waiting...');

// We can cancel the timer until the delay is passed
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval()
// Execute every interval

// Create a clock
setInterval(() => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  console.log(
    `${hour}`.padStart(2, 0) +
      ':' +
      `${minute}`.padStart(2, 0) +
      ':' +
      `${second}`.padStart(2, 0)
  );
}, 1000);
*/
