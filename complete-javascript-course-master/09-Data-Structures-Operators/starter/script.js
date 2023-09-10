'use strict';

// Data needed for a later exercise
const flights1 =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 Enhanced new syntax for methods
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // Old syntax for method
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  // ES6 Enhanced Object Literals
  openingHours,

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}

// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  let i = 1;

  for (let string of rows) {
    let strfin = string.trim().toLowerCase().split('_');
    let namesFin = [];
    for (let i = 0; i < strfin.length; i++) {
      if (i !== 0) {
        namesFin.push(
          strfin[i].replace(strfin[i][0], strfin[i][0].toUpperCase())
        );
      } else {
        namesFin.push(strfin[i]);
      }
    }
    console.log(`${namesFin.join('').padEnd(20)}${'✅'.repeat(i)}`);
    i++;
  }
});

/*
// String part 3

// Split and join
console.log('a+very+nice+string'.split('+')); // ["a", "very", "nice", "string"]
console.log('Lien Sean'.split(' ')); // ["Lien", "Sean"]

const [firstName, lastName] = 'Lien Sean'.split(' ');
const newName = ['Mr.', firstName, lastName.toLowerCase()].join('---');
console.log(newName); // Mr.---Lien---sean

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis'); //Jessica Ann Smith Davis
capitalizeName('yuhsiang lien'); // Yuhsiang Lien

// Padding => Add charaters to the string until the string reach the desired length.

const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+'));
// +++++++++++Go to gate 23!++++++++++
console.log('Jonas'.padStart(25, '+').padEnd(35, '+'));
// ++++++++++++++++++++Jonas++++++++++

const maskCrediCard = function (number) {
  const str = number + ''; // convert number into string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCrediCard(4336104739181));
console.log(maskCrediCard('324783478247234'));

// Repeat method
const message2 = 'Bad Weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};

planesInLine(5);
planesInLine(3);
planesInLine(23);

/*
// Strings part 2
const airline = 'TAP Air Portugal';

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing Email
const email = 'hello@gmail.com';
const loginEmail = '   Hello@GMAIL.Com \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replace part of string
const priceTW = '288,97NTD';
const priceUS = priceTW.replace('NTD', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. boarding door 23';

console.log(announcement.replace('door', 'gate'));
// The second 'door' will not be replace if use 'replace()' method
console.log(announcement.replaceAll('door', 'gate'));
// The second 'door' will also be replace
console.log(announcement.replace(/door/g, 'gate'));
// Use regular expression to deal with this problem

// Booleans
// 3 methods that return boolean value
const plane = 'Airbus 320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air'));

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new airbus family');
}

// Practice exercise
const checkBaggage = function (item) {
  // turn eveyting to lowercase first is easier.
  const baggage = item.toLowerCase(); 
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allow on board');
  } else {
    console.log('Welcome onboard');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
/*
// Strings part 1

// Index and Strings
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B747'.length);
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));

// use slice method with index
console.log(airline.slice(4)); // Air Portugal
console.log(airline.slice(4, 7)); // Air
// Get a substring by slice, the original string stay the same.
console.log(airline.slice(0, airline.indexOf(' '))); // TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Protugal

// Slice  backward
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seat
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log(`You got the middle seat ☹️`);
  else console.log('You got lucky 🤩');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('Jonas')); // String object
console.log(typeof new String('Jonas'));
console.log(typeof new String('Jonas').slice(1));



// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1
const events = [];
for (const [key, value] of gameEvents) {
  events.push(value);
}
const eventsUnique = [...new Set(events)];
console.log(eventsUnique);

const events2 = [...new Set(gameEvents.values())];
console.log(events2);

// 2
gameEvents.delete(64);
console.log(gameEvents);

// 3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4
for (const [key, value] of gameEvents) {
  console.log(
    `${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`
  );
}

/*
// Iteration of map
const question = new Map([
  ['question', 'What is the best programming language'],
  [1, 'c'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'correct'],
  [false, 'try again'],
]);

console.log(question);
// Convert object to map
console.log(Object.entries(openingHours));
const hourMap = new Map(Object.entries(openingHours));
console.log(hourMap);

// iterate a map
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = 3;
console.log(answer);
// Using boolean value as keys
console.log(question.get(answer === question.get('correct')));

// Convert map into array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);

/*
// Maps, like dictionary in python
const rest = new Map();

rest.set('name', 'classocp italiano');
rest.set(1, 'Firenze, italy');
rest.set(2, 'Lisbon, Protugal');

console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('oepn', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are closed');

console.log(rest);

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
// use the boolean value
console.log(rest.get(time > rest.get(open) && time < rest.get(close)));

// Check if the map has a value by key
console.log(rest.has('categories'));
// delete value from map
rest.delete(2);
console.log(rest);
// Check the size of map
console.log(rest.size);
// Clear the maps
// rest.clear();

// Use array and object as map keys

// When using an array as the key of maps,
// we have to bound it to a variable and used that variable name
const arr = [1, 2];
rest.set(document.querySelector('h1'), 'Heading');
rest.set(arr, 'Test');
console.log(rest);
console.log(rest.get(arr)); // This will not work

/*
// Sets <ES6>, set is also iterable but have no order
const orderSet = new Set(['pasta', 'pizza', 'pizza', 'pasta', 'rosotto']);
// Pass an array to create a set
console.log(orderSet);
console.log(new Set('Jonas')); // pass string and it will be seperate indicidually.
// get the size of set
console.log(orderSet.size);
console.log(orderSet.has('pizza'));
console.log(orderSet.has('bread'));
// add to set
orderSet.add('garlic bread');
orderSet.add('garlic bread');
console.log(orderSet);
// delete from set
orderSet.delete('rosotto');
console.log(orderSet);
// clear the whole set
// orderSet.clear();
console.log(orderSet);
// loop over set
for (const order of orderSet) console.log(order);

// use set to remove duplcate value in arrays
const staff = [
  'waiter',
  'chef',
  'waiter',
  'manager',
  'staff',
  'chef',
  'waiter',
];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['waiter', 'chef', 'waiter', 'manager', 'staff', 'chef', 'waiter'])
    .size
);

console.log(new Set('LIENYUHSIANG').size);

// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
let i = 1;
for (const player of game.scored) {
  console.log(`GOAL ${i}: ${player}`);
  i++;
}
// Another way
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);

// 2
let sumOdd = 0;
const odds = Object.entries(game.odds);
for (const [team, odd] of odds) {
  sumOdd += odd;
}
console.log(`The average odd is ${sumOdd / odds.length}`);

// 3
for (const [team, odd] of odds) {
  if (team !== 'x') {
    console.log(`Odd of victory ${team}: ${odd}`);
  } else {
    console.log(`Odd of draw: ${odd}`);
  }
}
// Use ternary operator
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}

// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
game.scorers = scorers;
console.log(game);
/*
// Looping Objects

// loop over keys
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of Object.keys(openingHours)) {
  openStr += `${day}, `;
}
console.log(openStr);

// loop over value
const values = Object.values(openingHours);
console.log(values);

// loop over the whole object
const entries = Object.entries(openingHours);
// console.log(entries);
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

/*
// Optional chaining
// if (restaurant.openingHours && restaurant.openingHours.mon.open) {
//   console.log(restaurant.openingHours.mon.open);
// }

// WITH OPETIONHAL CHAINING
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);
console.log(restaurant.openingHours.fri?.open);
// Only if property in front of the `?` exist, the later one will be read.

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Optional chaining on method
// Use to check if method exist
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.Risotta?.(0, 1) ?? 'Method does not exist');

// Optional chaining with array
const users = [
  {
    name: 'Sean',
    email: 's@gmail.com',
  },
];
// Use optional chaining to check if array is empty
console.log(users[0]?.name ?? 'User array empty');

/*
// Ehanced object literals
console.log(restaurant);

/*
// The for-of loop =  A easier way to loop over array
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  // Get the array index and item e.g., [index, item].
  console.log(`${i + 1}: ${el}`);
}
console.log([...menu.entries()]);

/*
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1, players2] = game.players;
console.log(players1, players2);
// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);
// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
// 4
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
// 5
const { team1: team1, x: draw, team2: team2 } = { ...game.odds };
console.log(team1, draw, team2);
// 6
const printGoals = function (...name) {
  let names = [];
  let goals = 0;
  for (let i = 0; i < name.length; i++) {
    names.push(name[i]);
    goals++;
  }
  console.log(names, goals);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);
// When passing an array, unpack first using SPREAD and then the function will pack it
// into arrays again using REST.
// 7
team1 < team2 && console.log('Team 1 is more likely to win');
/*
// Logical Assignment Operators

const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// Add numGuest property to the object who don't have
// By `||`
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;

// OR assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;

// Nullish logical assignment operator `??=`, can solve the 0 problem
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignemnt operator `&&=`
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1);
console.log(rest2);

/*
// Nullish Coalescing Operator `??`

// Solve this problem of `||` operator short circuiting
restaurant.numGuests = 0;
const guest2 = restaurant.numGuests || 10;
console.log(guest2); // 10

const guessCorrect = restaurant.numGuests ?? 10;
console.log(guessCorrect); // 0 
// `??` only evaluate Nullish value (null, undefined) so we can solve the 

/*
// `||` and `&&` 
// Use ANY datatype, return ANY datatype,
// Perform short-curcuiting

// OR OPERATOR
console.log('------- or ------');
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

const guest2 = restaurant.numGuests || 10;
console.log(guest2); // 10

// AND OPERATOR
console.log('----- and -----');
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas
console.log('Hello' && 23 && null && 'Jonas'); // null

if (restaurant.orderPizza) {
  restaurant.orderPizza('Mushrooms', 'Spanish');
}

restaurant.orderPizza && restaurant.orderPizza('Mushrooms', 'Spanish');

/*
// Rest Pattern - 1) destructuring

// SPREAD, because on RIGHT side of `=`
const str = [1, 2, ...[3, 4]];
// REST, because on LEFT side of `=`
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// REST on the left side, and SPREAD on the right side
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);
// REST must be the last element and can only have one

// REST with object
const { sat, ...weekDays } = restaurant.openingHours;
console.log(weekDays);

// Rest Patterm - 2) functions
//! REST parameter, use when we don't know how many argument will have.
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};

add(2, 3); // pack into array
add(5, 3, 7, 2);
add(4, 3, 23, 3, 2, 234);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('cheese', 'onion', 'olives', 'spanish');
restaurant.orderPizza('cheese');




/*
// Spread Operatot `...`
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// Spread operator will tale all the value out of the original array,
// and write them individaully.
const newArr = [1, 2, ...arr];
console.log(newArr);

// log individaul elemnts of the array
console.log(...newArr);
console.log(1, 2, 7, 8, 9); // Same output

// Build a new array, by expand the original array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy an array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);
// Join arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Spread work with all iterables
const str = 'Jonas';
const letters = [...str, '', 's.'];
console.log(letters);
console.log(...str);

// Use spread operator to pass mutiple arguments to functinos
const ingredients = [
  prompt("let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2'),
  prompt('Ingredient 3'),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients);

// Use Spread Operator on Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'sdjaid' };
console.log(newRestaurant);

// Perform shallow copy of object by Spread operator, and not
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'saojdosijd';
console.log(restaurantCopy.name);
console.log(restaurant.name);

/*
// We can call a function and pass a object as argument to the function,
// the function will unpack it automatically
restaurant.orderDelivery({
  time: '23:30',
  address: '232sdajosd',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: '23sdas',
  starterIndex: 1,
});

// Destructuring Object Using `{}`, and use exactly the property name we want.
const { name, openingHours, categories } = restaurant;
// Item in object does not have specific order, so we don't have to skip for selection.
console.log(name, openingHours, categories);

// Unpack by the name we want
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// We can also specify default value just like in arrays
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutate variables in object
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

// Unpeck nested object
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

/*
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // Destructuring
console.log(x, y, z);

let [main, , second] = restaurant.categories;
console.log(main, second);

// Switch without destructure
const temp = main;
main = second;
second = temp;
console.log(main, second);

// Switch with destructure
[main, second] = [second, main];
console.log(main, second);

// Receive 2 return values from a function.
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Use destructuring in destructuring to unpack nested array.
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// We can set default value for the item we extract to deal with unkown
// length of array, so when we unpack them, on items will be `undefined.
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/
