'use strict';
/*
// Constructor Functions and the 'new' Operator

// Only function expression and function declaration can be constructor function

// Create a constructor function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside constructor functions.
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// Create instances of Person with constructor function
const jonas = new Person('Jonas', 1991); // Use `new` operator to call the function
console.log(jonas);

// When we use `new` operator to call constructor functions
// 1. New object is created
// 2. Function is called, `this` keyword point to the new object
// 3. object linked to prototype
// 4. function automatically return the new object

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jeck', 1975);

console.log(matilda, jack);

// Check if a object is a instance of prototype
console.log(jonas instanceof Person);

// Prototypes

// Each and every function in Javascript automatically has a property called prototype. And that
// includes `constructor functions`. So now every object that's created by a certain constuctor
// function will get access to call the methods and properties that we defin on the constructors
// prototype property.

console.log(Person.prototype);

// Add method to the prototype property instead of create it in the constructor function
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

// Check ths prototype of 'jonas'
console.log(jonas.__proto__);
// jonas' prototype === prototype property of Person
console.log(jonas.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Set properties on prototypes
Person.prototype.species = 'Homo Sepiens';
console.log(jonas.species, matilda.species);

// The properties that set to the prototype is not belongs to the object but the prototype only.
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// Prototype inheritance on built-in objects
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 5, 3, 56, 3, 5, 4, 6, 3, 4, 6]; // new Array === []
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);
// Not recommanded to add method to the built in object
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');

console.dir(x => x + 1);
*/

// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
/*
// Create constructor function
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
// Add methods to the prototype property of constructor function to get optimized performance
Car.prototype.accelerate = function () {
  console.log((this.speed += 10));
};

Car.prototype.break = function () {
  console.log((this.speed -= 10));
};

// Create instances with constructor function
const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);
console.log(car1, car2);

// Test the methods
car1.accelerate();
car1.break();

car2.accelerate();
car2.accelerate();


// ES6 classes

// More modern syntax to implement OOP

// class expression
// const PersonCl = class {}

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property of the constuctor functon but not the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are NOT hoisted
// 2. Class are firstclass citizens
// 3. Classes are executed in strict mode


// Setters amd Getters

// Methods that can be use just like properties.

const account = {
  owner: 'Jonas',
  movements: [200, 150, 120, 300],

  // use `get` to convert a method into getters
  get latest() {
    return this.movements.slice(-1).pop();
  },
  // use `set` to convert a method in to setters
  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest); // We use the getter as a property
account.latest = 50; // Use the setter as a property
console.log(account.movements);

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instances methods
  // Methods will be added to .prototype property of the constuctor functon but not the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exist
  set fullName(name) {
    if (name.includes(' '))
      this._fullName = name; // use `_` when there is a naming conflict
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }

  // Create static mathods
  static hey = function () {
    console.log('Hey there');
    console.log(this);
  };
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica.age);
console.log(jessica);
// use getter and setter to perfrom validation.
// const walter = new PersonCl('Walter', 1965); // Alert will be triggered


// Static method

// Methods that is exist in the namespace of the constructor function

class PersonCl {
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
  
    // Instances methods
    // Methods will be added to .prototype property of the constuctor functon but not the object
    calcAge() {
      console.log(2037 - this.birthYear);
    }
    greet = function () {
      console.log(`Hey ${this.firstName}`);
    };
  
    get age() {
      return 2037 - this.birthYear;
    }
  
    // Set a property that already exist
    set fullName(name) {
      if (name.includes(' '))
        this._fullName = name; // use `_` when there is a naming conflict
      else alert(`${name} is not a full name`);
    }
    get fullName() {
      return this._fullName;
    }
  
    // Create static mathods, which is not avalible for instances
    static hey = function () {
      console.log('Hey there');
      console.log(this);
    };
  }

PersonCl.hey();


// Object.create

// Another way to implement OOP
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Manually set the steven's prototype as PersonProto
const steven = Object.create(PersonProto);
console.log(steven); // Steven will be link to the PersonProto
steven.name = 'steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  // Add method
  accelerate = function () {
    console.log((this.speed += 10));
  };
  break = function () {
    console.log((this.speed -= 10));
  };

  // Add getter setter
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new Car('ford', 120);
console.log(car1);
console.log(car1.speedUS);
car1.speedUS = 50;
console.log(car1);
*/
/*
// Inheritance Between Classes:constructor function

//  Create constructor function for Person
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Create constructor function for Student with `inheritance between classes`
const Student = function (firstName, birthYear, course) {
  // Use Person as normal function call to get the same properties as Personm, and use .call() to
  // specify `this` keyword, and we know that `this` keyword will point to the function that
  // `new` operator create in this case `mike`.
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Use Object.create to manually set the prototype property so that the methods set on parent class
// prototype perperty can be inherant.p
Student.prototype = Object.create(Person.prototype);
// Student.prototype = Person.prototype // Wrong code

// Object.create must be put before we add new method to the prototype property of child class, or
// else the new method we want will be overwrite
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'CS');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__); // Person {introduce: ƒ}
console.log(mike.__proto__.__proto__); // {calcAge: ƒ, constructor: ƒ}

// mike is instance of both Student and Person since we link them together using Object.create
console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor); // Student(firstName, birthYear, course)

// Coding Challenge #3
*/

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
// Add methods to the prototype property of constructor function to get optimized performance
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is going at ${this.speed}`);
};

Car.prototype.break = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed}`);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
// Overwrite the original accelerate method only in EV class.
// When there are two method with the same name in the prototype chain, the first one will be used.
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} with a charge of  ${this.charge}`
  );
};

const car1 = new EV('Tesla', 120, 23);
console.log(car1);
car1.accelerate();
car1.chargeBattery(90);
console.log(car1);
*/
/*
// Inheritance between classes: ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instances methods
  // Methods will be added to .prototype property of the constuctor functon but not the object
  calcAge() {
    console.log(2037 - this.birthYear);
  }
  greet = function () {
    console.log(`Hey ${this.firstName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exist
  set fullName(name) {
    if (name.includes(' '))
      this._fullName = name; // use `_` when there is a naming conflict
    else alert(`${name} is not a full name`);
  }
  get fullName() {
    return this._fullName;
  }

  // Create static mathods, which is not avalible for instances
  static hey = function () {
    console.log('Hey there');
    console.log(this);
  };
}

// `extand` keyword and `super()` function to perform inheritance between classes
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce = function () {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  };

  // Overwrite / shadowing a method from parent class
  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I fell more liie ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// If we don't need to add new properties, we don't even need a constructor function
// class StudentCl extends PersonCl {}

const martha = new StudentCl('Martha Jones', 2012, 'CS');
// const martha = new StudentCl('Martha Jones', 2012);
console.log(martha);
martha.introduce();
martha.calcAge();


// Inheritance between classes: Object.create()

// Parent class
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
// StudentProto is prototype of jay, and PersonProto is the prototype of StudentProto
jay.init('Jay', 2010, 'CS');
jay.introduce();
jay.calcAge();


// Use ES6 class
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    // We can create any properties that are not base on input by this
    this.movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  // API to interact with our properties
  deposit(val) {
    this.movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(1000)) {
      this.deposit(val);
      console.log(`Loan approvedß`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1);

console.log(acc1.pin);


// Encapsulation: protect properties and methods

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // We can create any properties that are not base on input by this
    this._movements = []; // Use `_` to protect properties like python but its also not real private.
    this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  // API to interact with our properties

  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(1000)) {
      this.deposit(val);
      console.log(`Loan approvedß`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1.pin); // undefined


// Encapsulation: Private Class Fields and Methods proposal (Not yet in practice)

// 1. public field =>  field = Property that will be on all instances
// 2. private field
// 3. public methods
// 4. private methods
// There is also static version

class Account {
  // 1. publc field (instances)
  locale = NavigationPreloadManager.language;

  // 2. private field => add `#` in front of a variable
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // We can create any properties that are not base on input by this
    // this._movements = []; // Use `_` to protect properties like python but its also not real private.
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`);
  }

  // 3. Piublic method
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan(1000)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  // 4. Private methods
  //   #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }

  // static method, only work on class itself
  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);
console.log(acc1.pin); // undefined

// console.log(acc1.#movements); // turely private property
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(1000));
Account.helper();

// Chining method
// Just convert the method to return `this` and we can chain methods

acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
console.log(acc1.getMovements());
*/
// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}`);
    return this;
  };
  break = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed}`);
    return this; // make method chainable
  };

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  // private property
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this; // make method chainable
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.make} is going at ${this.speed} with a charge of  ${this.#charge}`
    );
    return this; // make method chainable
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian
  .accelerate()
  .accelerate()
  .chargeBattery(90)
  .break()
  .accelerate()
  .break()
  .chargeBattery(95)
  .accelerate();
console.log(rivian);
// console.log(rivian.#charge); // `#charge` is private
console.log(rivian.speedUS);
