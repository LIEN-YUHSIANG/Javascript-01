'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scrolling for `learn more` btn
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Revealing Elements on scrolling

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

/////////////////////////////////////////////////////////////////////////////////////////
// Page Navigation

// Without Event Delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(`LINK`);

//     // Get and store the href attribute so we can use it as a seletor
//     const id = this.getAttribute('href');
//     console.log(id);
//     // Use scrollIntoView to implement smooth scroll
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });

// With Event Delegation

// Attach the eventListener on the common parent of the target elements.

// 1. Add event listener to common element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Building Tabbed Component

// // use event delegation
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  // Remove active tab and content
  tabs.forEach(function (t) {
    t.classList.remove('operations__tab--active');
  });

  tabsContent.forEach(function (c) {
    c.classList.remove('operations__content--active');
  });

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade anumation

// Optimize by passing arguments to event handlers
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// Further optimize by utilizing `.bind()` function method
// Passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// Better way => Type2: Intersection Observer API

// The callback function will be called, everytime the observed element is intersecting
// the root element at the threshold that we defined.
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // Set to null == viewpoint
//   threshold: [0, 0.2], // Intersecting percentage. We can have an array of threshold
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// // Type1: Using scroll event => Bad performance
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function (e) {
//   console.log(window.scrollY);

//   // Since the scroll coord is dynamic, we have to calculate it
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

/*
// Selecting elements

// Select document, head, body element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // This will return a 'node list' that contain all sections

document.getElementById('#section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // this return an 'HTML collection', which is a live collection
// so that the collection will update when ever the DOM is modified.

console.log(document.getElementsByClassName('btn')); // This also return a HTML collection

// Createing and inserting elements

// document.insertAdjacentHTML

const message = document.createElement('div');
// Create a DOM element that can be modified but not yet add to the DOM
// Have to be insert manually

// Add class
message.classList.add('cookie-message');
// Read or modify textContent
// message.textContent = 'We use cookies for imporved functionality and analytics';
// Read or modify inner HTML
message.innerHTML =
  'We use cookies for imporved functionality and analytics. <botton class="btn btn--close-cookie">Got it!</botton>';
// insert into DOM
header.prepend(message); // Adds the element as the first child of the parent element
header.append(message); // Adds the element as the last child of the parent element
// Since the 'message' element is a live element so it cannot be at multiple places at the same time.
// So the `prepend` is overwritten by the `append`. Since the DOM element is unique.

// Insert multoiple copy of the same element
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    // Old way when .remove() is not avalible we can only delete child element
    // so we have to select the parent element first.
    message.parentElement.removeChild(message);
  });

// Styles

// Get access of the `style` attribute of the element and modify it.
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// We can only get the information of the inline style we manully
// set.
console.log(message.style.height);
console.log(message.style.backgroundColor);

// The way to get all the style of information.
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

// How to modify a hidden style
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Get access and modify the CSS custom properties.
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes

const logo = document.querySelector('.nav__logo'); // select by class
console.log(logo.alt); // alternate text
console.log(logo.src); // source, we are getting the absolute location
console.log(logo.className); // nav__logo

// Modify the attribute
logo.alt = 'Beautiful minimalist logo';

// Non-stantard
console.log(logo.designer); // undefined
// The way to read the non-standard attribute
console.log(logo.getAttribute('designer'));
// Set non-standard attribute
logo.setAttribute('company', 'Bankist');

// To get the relative location of the src, use getAttribute() method
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http://127.0.0.1:5500/complete-javascript-course-master/13-Advanced-DOM-Bankist/starter/index.html#
console.log(link.getAttribute('href')); // #

// Data attributes

// Add into the HTMl in `data-version-number="3.0"` dash line style,
// but when in Js DOM, use camelCase `versionNumber`.
console.log(logo.dataset.versionNumber); // 3.0

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use since this will overwrite all the existed class and can have only one name.
logo.className = 'jonas';


// Implemeting smooth scroll

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// // Old way to scroll smoothly
// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect(); // Get position relative to viewpoint
//   console.log(s1coords);

//   console.log(e.target.getBoundingClientRect()); // e.target point to the clicked element

//   // Get currrent scroll coord
//   console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

//   // Get current height/width of the viewpoint
//   console.log(
//     'height/width viewpoint',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   // Scrolling to section1 using coordinate we get.
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   // Note that the coordinate is always realtive so we have to do some
//   // modification so that the position is absolute by:
//   // "Current Position + Current Scroll"

//   // Smooth out the action
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: 'smooth',
//   });
// });

// Modern way to scroll smoothly
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

// Events

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // h1.removeEventListener('mouseenter', alertH1);
  // In the same eventListener function, we also remove the function, so we can only
  // listen to the event once.
};

h1.addEventListener('mouseenter', alertH1);

// We can also setTimeout the control the time we want the listener to be remove
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// In the same eventListener function, we also remove the function, so we can only
// listen to the event once.)

// Another way to attach eventlistener to an element

// Using the `on-event` property, but this is the old way
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };


// Event Propagation: Bubbling and Capturing

// Craete rondom color to use
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// Attach eventHandler to target and all parent elements
// Event bubbling in action, so the event will be handle in all the parent element.

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // `this keyword` in an eventListener is point to the element it attach
  this.style.backgroundColor = randomColor();
  console.log(`LINK`, e.target, e.currentTarget); // Find out the event target: where the event happend
  console.log(e.currentTarget === this); // currentTarget === this keyword

  // Stop propagation
  // e.stopImmediatePropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log(`CONTAINER`, e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log(`NAV`, e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  true // Set the 3rd parameter to true to listen to capture events.
);
// All the eventListeners are handling the same event, because of event bubbling so
// that we can handle the event in all parent elements


// DOM Traversing

const h1 = document.querySelector('h1');

// Going Downward => Seleting child

console.log(h1.querySelectorAll('.highlight'));
// Directly perform a qeurySeletor to the element will get the child element if it,
// note that no matter how deep the child element is, we can get it.

console.log(h1.childNodes); // Get direct child Nodes
console.log(h1.children); // Get HTML collection
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';

// Going Upwards => Seleting parents

console.log(h1.parentNode);
console.log(h1.parentElement);

// Select the closest parent element that match the query string
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';
// If the closest element that match the queryString is the element itself,
// `.closest()` will return the element.

// Going Sideways => Selecting siblings

// We can only access direct siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// If we want to get all sibling elements we can go to the parent element first,
// and search from there.
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
