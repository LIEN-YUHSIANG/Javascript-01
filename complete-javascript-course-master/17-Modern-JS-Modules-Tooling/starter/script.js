// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';

// import * as ShoppingCart from './shoppingCart.js';

// console.log(`Importing module`);

// // ShoppingCart.addToCart('bread', 5);
// // console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// import add from './shoppingCart.js';
// add('pizza', 2);

// import { cloneDeep } from './node_modules/lodash-es/cloneDeep.js';

// const state = {
//   cart: [
//     { product: 'bread', quantity: '5' },
//     { product: 'pizza', quantity: '5' },
//   ],
//   user: { loggedIn: true },
// };

////////////////////////////////////////////////////////////////////////////////////

console.log('Importing module');

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

import cloneDeep from 'lodash';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
