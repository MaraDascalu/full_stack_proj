// ! Access the button element
const buttonEl = document.getElementById("actionButton");

// ! Single click
buttonEl.addEventListener("click", function () {
  console.log("Btn was clicked");
});

// ! Docuble click
buttonEl.addEventListener("dblclick", function () {
  console.log("Btn was double clicked");
});

// ! Mouse enter
buttonEl.addEventListener("mouseenter", function () {
  console.log("mouseenter");
});

// ! Mouse leave
buttonEl.addEventListener("mouseleave", function () {
  console.log("mouseleave");
});
