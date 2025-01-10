// script.js
const currentTimeDisplay = document.getElementById('current-time');
const toggleFormatButton = document.getElementById('toggle-format');
const timerDisplay = document.getElementById('timer-display');
const startTimerButton = document.getElementById('start-timer');
const pauseTimerButton = document.getElementById('pause-timer');
const stopTimerButton = document.getElementById('stop-timer');
const countdownInput = document.getElementById('countdown-input');
const countdownDisplay = document.getElementById('countdown-display');
const startCountdownButton = document.getElementById('start-countdown');
const pauseCountdownButton = document.getElementById('pause-countdown');
const stopCountdownButton = document.getElementById('stop-countdown');

let is24HourFormat = true;
let timerInterval;
let countdownInterval;
let timerSeconds = 0;
let countdownSeconds = 0;

// Update Current Time
function updateCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  if (!is24HourFormat) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    currentTimeDisplay.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
  } else {
    currentTimeDisplay.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}`;
  }
}

// Toggle Time Format
toggleFormatButton.addEventListener('click', () => {
  is24HourFormat = !is24HourFormat;
  toggleFormatButton.textContent = is24HourFormat ? 'Switch to 12-Hour Format' : 'Switch to 24-Hour Format';
  updateCurrentTime();
});

// Timer Functions
function updateTimerDisplay() {
  const hours = Math.floor(timerSeconds / 3600);
  const minutes = Math.floor((timerSeconds % 3600) / 60);
  const seconds = timerSeconds % 60;
  timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startTimerButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
});

pauseTimerButton.addEventListener('click', () => {
  clearInterval(timerInterval);
});

stopTimerButton.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerSeconds = 0;
  updateTimerDisplay();
});

// Countdown Functions
function updateCountdownDisplay() {
  const hours = Math.floor(countdownSeconds / 3600);
  const minutes = Math.floor((countdownSeconds % 3600) / 60);
  const seconds = countdownSeconds % 60;
  countdownDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startCountdownButton.addEventListener('click', () => {
  const inputSeconds = parseInt(countdownInput.value, 10);
  if (inputSeconds > 0 && inputSeconds <= 100000) {
    countdownSeconds = inputSeconds;
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        updateCountdownDisplay();
      } else {
        clearInterval(countdownInterval);
        alert('Countdown finished!');
      }
    }, 1000);
  } else {
    alert('Please enter a valid number of seconds (1-100000).');
  }
});

pauseCountdownButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
});

stopCountdownButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownSeconds = 0;
  updateCountdownDisplay();
});

// Initialize
setInterval(updateCurrentTime, 1000);
updateCurrentTime();