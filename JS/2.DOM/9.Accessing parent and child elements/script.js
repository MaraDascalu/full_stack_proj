// ! Accessing Parent Elements
const parentEl = document.getElementById("parent");
// console.log(parentEl);

// ! Accessing the grandparent element
const grandparentEl = parentEl.parentNode;
// console.log(grandparentEl);

// ! Accessing Child Elements
const firstChildEl = parentEl.firstChild;
const lastChildEl = parentEl.lastChild;

console.log(lastChildEl);
console.log(firstChildEl);

// ! Accessing Element Children Only
const firstElmentChild = parentEl.firstElementChild;
const lastElementChild = parentEl.lastElementChild;

console.log(lastElementChild);
console.log(firstElmentChild);
