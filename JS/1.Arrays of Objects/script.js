// ========
// The concept of objbeing passed by reference
// ========

// ? Modifying obj through a different reference

// const person1 = { name: "Alice", age: 20 };
// console.log("person1", person1);
// const person2 = person1;
// // modify age
// person2.age = 30;
// person1.name = "Ema";

// console.log("person2", person2);
// console.log("person1", person1);

// ? Passing obj to a function

const incrmAge = (persObj) => {
  persObj.age += 1;
};

//person Obj

// const bob = { name: "Bob", age: 30 };

// console.log("Before", bob);

// incrmAge(bob);
// console.log("After", bob);

// =======
// Obj in Arrays
// =======

// Scenario: Manage a list of students

const students = [
  { id: 1, name: "Bob", grade: "A" },
  { id: 2, name: "Alice", grade: "A" },
];

// ? Accessing students
const student1 = students[0].name;

// ? Add new student
const addstudents = (id, name, grade) => {
  const newStudent = { id, name, grade };

  students.push(newStudent);
};

addstudents(3, "Marie", "C");

// ? Update student
const updateStudentGrade = (id, grade) => {
  const studentFound = students.find((student) => {
    return student.id === id;
  });

  if (studentFound) {
    studentFound.grade = grade;
  } else {
    console.log("Studdent not found");
  }
};

updateStudentGrade(2, "F");
// updateStudentGrade(4, "F");

// =====
// Arrays in Objects
// =====

// Scenario: Manage a simple to do list

const todoList = {
  title: "To-Do List APP ",
  tasks: [
    { id: 1, description: "Groceries", completed: false },
    { id: 2, description: "Gym", completed: true },
    { id: 3, description: "Call Mom", completed: false },
  ],
};

// ? Accessing properties
const allTasks = todoList.tasks;
// console.log(allTasks);

// ? Add task
const addTask = (description) => {
  let newId = allTasks.length + 1;
  let newTask = { id: newId, description, completed: false };

  allTasks.push(newTask);
};

addTask("Run");
// console.log(todoList);

// ? Mark task as completed

const markAsCompleted = (id) => {
  const foundTask = allTasks.find((task) => {
    return task.id === id;
  });

  if (foundTask) {
    foundTask.completed = true;
  } else {
    console.log("The id is invalid!");
  }
};

markAsCompleted(1);
markAsCompleted(2);
// console.log(todoList);

// ======
// Iterating using forEach()
// ======

// Basic example
const fruits = [
  { name: "Apple", color: "red" },
  { name: "Banana", color: "yellow" },
];

// fruits.forEach((currentValue, index, array) => {
//   console.log(currentValue, index, array);
// });

// Sceanrio: Shoping Chart Calculation

const cart = [
  { name: "Laptop", price: 1000, qt: 1 },
  { name: "TV", price: 1500, qt: 1 },
  { name: "Phone", price: 500, qt: 2 },
  { name: "Headphones", price: 100, qt: 3 },
];

// ? Calculate total cost of the cart
let totalCost = 0;
cart.forEach((item) => {
  totalCost += item.price * item.qt;
});

// console.log(totalCost);

// ? List all the names of the product
let productsNames = [];
cart.forEach((item) => {
  productsNames.push(item.name);
});

// console.log(productsNames);

// ? Calculate total number of products
let totalProducts = 0;
cart.forEach((item) => {
  totalProducts += item.qt;
});

// console.log(totalProducts);

// ======
// Iterating through arrays using map()
// ======

// Scenario: Apply 10% discount to products

const shoppingChart = [
  { name: "Laptop", price: 1000, qt: 1 },
  { name: "TV", price: 1500, qt: 1 },
  { name: "Phone", price: 500, qt: 2 },
  { name: "Headphones", price: 100, qt: 3 },
];

// ? Add 10% discount
const discountChart = shoppingChart.map((product) => {
  return {
    name: product.name,
    price: product.price * 0.9,
  };
});

// console.log(discountChart);

// ======
// Iterating through arrays using filter()
// ======

// Scenario: Filter active users

const users = [
  { id: 1, isActive: false, name: "Bob" },
  { id: 2, isActive: true, name: "Emma" },
  { id: 3, isActive: false, name: "Alice" },
];

// ? Return filtered users

const activeUsers = users.filter((user) => {
  return user.isActive === true;
});

// console.log(activeUsers);

// ======
// Transformstion and Manipulation using splice()
// =====

// Scenario: Managing playlist (you need to add or remove a song, or rearange the playlist)

const playlist = [
  { id: 1, title: "Song1", artist: "Artist A" },
  { id: 2, title: "Song2", artist: "Artist B" },
  { id: 3, title: "Song3", artist: "Artist C" },
  { id: 4, title: "Song4", artist: "Artist D" },
];

// ? find index to remove song
const indexToRemove = playlist.findIndex((song) => song.id === 1);

// console.log(indexToRemove);

// ? remove song
// if (indexToRemove !== -1) {
//   playlist.splice(indexToRemove, 1);
// } else {
//   console.log("The index is invalid!");
// }

// console.log(playlist);

// ? Move a song to third position
const indexToMove = playlist.findIndex((song) => song.id === 1);

// ? move the song
// if (indexToMove !== -1) {
//   const [songToMove] = playlist.splice(indexToMove, 1);
//   playlist.splice(2, 0, songToMove);
// } else {
//   console.log("The index is invalid!");
// }

// console.log(playlist);

// ? insert new song
const newSong = { id: 5, title: "Song5", artist: "Artist E" };

playlist.splice(1, 0, newSong);
// console.log(playlist);

// ======
// Object.assign()
// ======

// Scenario: updating properties of students in a class
const studentsArr = [
  { id: 1, name: "Bob", grade: "A" },
  { id: 2, name: "Alice", grade: "C" },
  { id: 3, name: "Emma", grade: "B" },
];

// ? Grade update
const gradeUpdates = [{ grade: "A+" }, { grade: "B" }, { grade: "C" }];

// ? Update the students
const updateStudents = studentsArr.map((student, index) => {
  return Object.assign({}, student, gradeUpdates[index]);
});

// console.log(updateStudents);

// =====
// Search and filter using find()
// =====

//Sceanrio: Finding the first pacient with a specific disease
const patients = [
  { id: 101, name: "Sarah", disease: "Cold" },
  { id: 102, name: "Mike", disease: "Fever" },
  { id: 103, name: "Lucy", disease: "Cold" },
];

// ? Find patient with cold
const patientWithCold = patients.find((patient) => {
  return patient.disease === "Cold";
});

// console.log(patientWithCold);

// =====
// Search and filter using some()
// =====
const patients2 = [
  { id: 101, name: "Sarah", disease: "Cold" },
  { id: 102, name: "Mike", disease: "Fever" },
  { id: 103, name: "Lucy", disease: "Cold" },
];

// ? Find patient with cold
const patientWithCold2 = patients.some((patient) => {
  return patient.disease === "Cold";
});

// console.log(patientWithCold2);

// =====
// Search and filter using every()
// =====

const courseStudents = [
  { id: 1, name: "Bob", grade: "A" },
  { id: 2, name: "Alice", grade: "C" },
  { id: 3, name: "Emma", grade: "B" },
];

// Scenario: confirm that all students passed
const allPassed = courseStudents.every((student) => {
  return student.grade !== "F";
});

console.log(allPassed);
