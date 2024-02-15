// ? Named function for alert
function showAlert() {
  console.log("Hello");
}

// ? Getting the button element
const alertButtonEl = document.getElementById("alertButton");

// ? Add addEventListener  to the element
alertButtonEl.addEventListener("click", showAlert);

// ? Named function for  removing event
function removeAlert() {
  alertButtonEl.removeEventListener("click", showAlert);
}

// ? Getting the remove button element
const removeButtonEl = document.getElementById("removeButton");

removeButtonEl.addEventListener("click", removeAlert);
