document.addEventListener("DOMContentLoaded", () => {
  // * Select element
  const startButton = document.getElementById("start-countdown");
  const pauseButton = document.getElementById("pause-countdown");
  const cancelButton = document.getElementById("cancel-countdown");
  const resumeButton = document.getElementById("resume-countdown");

  // ! Initial values
  let countdownTimer;
  let endTime;

  // * Function to update the display
  function updateDisplay(time) {
    // ? Get days
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    // ? Get hours
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // ? Get minutes
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    // ? Get seconds
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  }
  // * Function to reset the display
  function resetDisplayAndButtons() {
    document.getElementById("target-date").value = "";
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    startButton.disabled = false;
    pauseButton.disabled = true;
    cancelButton.disabled = true;
    resumeButton.disabled = true;
  }

  // * Function to start the countdown
  function startCountdown(duration, isResuming = false) {
    if (!isResuming) {
      endTime = Date.now() + duration;
    }

    countdownTimer = setInterval(() => {
      const timeLeft = endTime - Date.now();
      if (timeLeft <= 0) {
        clearInterval(countdownTimer);
        displayMessage("Countdown finished!");
        localStorage.removeItem("countdownTarget");
        resetDisplayAndButtons();
        return;
      }
      updateDisplay(timeLeft);
      pauseButton.disabled = false;
      cancelButton.disabled = false;
    }, 1000);
  }

  // * Function to display the message
  function displayMessage(message) {
    const display = document.getElementById("timer-display");
    display.textContent = message;
  }

  // ! Start button
  startButton.addEventListener("click", function () {
    const targetDateValue = document.getElementById("target-date").value;
    if (targetDateValue) {
      const targetDate = new Date(targetDateValue);
      const now = new Date();
      if (targetDate > now) {
        const duration = targetDate - now;
        localStorage.setItem("countdownTarget", targetDate.toString());
        startCountdown(duration);
        startButton.disabled = true;
        pauseButton.disabled = false;
        cancelButton.disabled = false;
        resumeButton.disabled = true;
      } else {
        alert("Please select a future date and time!");
      }
    } else {
      alert("Please select date and time");
    }
  });

  // ! Pause button
  pauseButton.addEventListener("click", function () {
    clearInterval(countdownTimer);
    pauseButton.disabled = true;
    resumeButton.disabled = false;
  });

  // ! Resume button
  resumeButton.addEventListener("click", function () {
    const duration = endTime - Date.now();
    startCountdown(duration, true);
    pauseButton.disabled = false;
    resumeButton.disabled = true;
  });

  // ! Cancel button
  cancelButton.addEventListener("click", function () {
    clearInterval(countdownTimer);
    localStorage.removeItem("countdownTarget");
    resetDisplayAndButtons();
  });

  // * Function to load and auto-save the countdown is a saved target exists
  const savedDate = localStorage.getItem("countdownTarget");
  if (savedDate) {
    const targetDate = new Date(savedDate);
    const now = new Date();
    if (targetDate > now) {
      const duration = targetDate - now;
      startCountdown(duration);
      startButton.disabled = true;
      pauseButton.disabled = false;
      resumeButton.disabled = true;
      cancelButton.disabled = false;
    } else {
      localStorage.removeItem("countdownTarget");
      resetDisplayAndButtons();
    }
  }
});
