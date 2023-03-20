import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const myInput = document.querySelector("#datetime-picker");
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,     
  onClose(selectedDates) {
    convertMs(timeDeley(selectedDates));
  },
};

startBtn.disabled = true;

function timeDeley(selectedDates) {
  const selectedTime = new Date(selectedDates[0]).getTime();
  const curentTime = Date.now();
  if (selectedTime < curentTime){
    startBtn.disabled = true;
    Notify.failure(
      `Please choose a date after ${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`
      );
      return;
    }
    startBtn.disabled = false;  
    return timeDeley = selectedTime-curentTime;
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
    return { days, hours, minutes, seconds };
  }
  
  flatpickr(myInput, options);  
  startBtn.addEventListener("click", ClickedStartButton);
  
  function ClickedStartButton() {
    startBtn.disabled = true;
    timerId = setInterval(countdown, 1000);
  }
  
  function countdown() {
    let timeLeft = new Date(myInput.value) - new Date();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      Notify.success('Time is over!');
      return;
    }
    updateTimerTable(convertMs(timeLeft));
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  };
  
  function updateTimerTable({ days, hours, minutes, seconds }) {
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
      timerSeconds.textContent = addLeadingZero(seconds);
    }


