// ! Using `getAttribute` and `setAttribute`
const userCard = document.getElementById("userCard");
const userId = userCard.getAttribute("data-user-id");
const userRole = userCard.getAttribute("data-user-role");

// console.log(userId);
// console.log(userRole);

// ! Modifying data attributes
userCard.setAttribute("data-user-role", "super-admin");
userCard.setAttribute("data-user-position", "Engineer");

// console.log(userCard);

// ! Using the dataset
const userRole2 = userCard.dataset.userRole;
const userId2 = userCard.dataset.userId;

// console.log(userCard.dataset);
// console.log(userId2);
// console.log(userRole2);
