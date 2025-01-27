const currentTimeEl = document.getElementById("current-time");
const toggleFormatBtn = document.getElementById("toggle-format");

let is24HourFormat = true;

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  if (!is24HourFormat) {
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    currentTimeEl.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
  } else {
    currentTimeEl.textContent = `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  }
}

toggleFormatBtn.addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
  toggleFormatBtn.textContent = is24HourFormat ? "Switch to 12-hour" : "Switch to 24-hour";
});

setInterval(updateTime, 1000);

const timerDisplay = document.getElementById("timer-display");
const startTimerBtn = document.getElementById("start-timer");
const pauseTimerBtn = document.getElementById("pause-timer");
const resetTimerBtn = document.getElementById("reset-timer");

let timerInterval;
let timerSeconds = 0;

function updateTimerDisplay() {
  const hours = String(Math.floor(timerSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(timerSeconds % 60).padStart(2, "0");
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

startTimerBtn.addEventListener("click", () => {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }
});

pauseTimerBtn.addEventListener("click", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    pauseTimerBtn.textContent = "Play"; 
  } else {
    timerInterval = setInterval(() => {
      timerSeconds++;
      updateTimerDisplay();
    }, 1000);
    pauseTimerBtn.textContent = "Pause"; 
  }
});

resetTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerSeconds = 0;
  updateTimerDisplay();
  pauseTimerBtn.textContent = "Pause"; // Reset button text to "Pause"
});

const countdownInput = document.getElementById("countdown-input");
const countdownDisplay = document.getElementById("countdown-display");
const startCountdownBtn = document.getElementById("start-countdown");
const pauseCountdownBtn = document.getElementById("pause-countdown");
const resetCountdownBtn = document.getElementById("reset-countdown");

let countdownInterval;
let countdownSeconds = 0;

function updateCountdownDisplay() {
  const hours = String(Math.floor(countdownSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(countdownSeconds % 60).padStart(2, "0");
  countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

startCountdownBtn.addEventListener("click", () => {
  if (!countdownInterval && countdownSeconds > 0) {
    countdownInterval = setInterval(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        updateCountdownDisplay();
      } else {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
    }, 1000);
  }
});

pauseCountdownBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
});

resetCountdownBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownSeconds = parseInt(countdownInput.value) || 0;
  updateCountdownDisplay();
});

countdownInput.addEventListener("input", () => {
  countdownSeconds = parseInt(countdownInput.value) || 0;
  updateCountdownDisplay();
});

updateTimerDisplay();
updateCountdownDisplay();

const currentTimeBtn = document.getElementById("current-time-btn");
const timerBtn = document.getElementById("timer-btn");
const countdownBtn = document.getElementById("countdown-btn");

const modes = {
  "current-time-mode": document.getElementById("current-time-mode"),
  "timer-mode": document.getElementById("timer-mode"),
  "countdown-mode": document.getElementById("countdown-mode"),
};

currentTimeBtn.addEventListener("click", () => {
  setActiveMode("current-time-mode");
});

timerBtn.addEventListener("click", () => {
  setActiveMode("timer-mode");
});

countdownBtn.addEventListener("click", () => {
  setActiveMode("countdown-mode");
});

function setActiveMode(modeId) {
  Object.values(modes).forEach((mode) => {
    mode.classList.remove("active");
  });
  modes[modeId].classList.add("active");
}