document.addEventListener('DOMContentLoaded', function () {
    const timeInput = document.getElementById('time-input');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const alarmSound = document.getElementById('alarm-sound');
    const ringtoneSelect = document.getElementById('ringtone-select');
  
    let timer;
    let totalTimeInSeconds;
    let isRunning = false;
    let alarmTimeout;
  
    startTimerBtn.addEventListener('click', function () {
      if (isRunning) {
        // Stop the timer and the alarm
        clearInterval(timer);
        clearTimeout(alarmTimeout);
        alarmSound.pause();
        alarmSound.currentTime = 0; // Reset the sound to start
        resetTimer();
        return;
      }
  
      let timeInMinutes = parseInt(timeInput.value);
      if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
      }
  
      totalTimeInSeconds = timeInMinutes * 60;
      isRunning = true;
      updateTimerDisplay();
  
      // Set the alarm sound source based on selected ringtone
      alarmSound.src = ringtoneSelect.value;
  
      // Change button text and color
      startTimerBtn.textContent = 'Stop';
      startTimerBtn.classList.add('red');
  
      timer = setInterval(() => {
        totalTimeInSeconds--;
        updateTimerDisplay();
  
        if (totalTimeInSeconds <= 0) {
          clearInterval(timer);
          alarmSound.play();
          isRunning = false;
  
          // Set the alarm to stop after 30 seconds
          alarmTimeout = setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0; // Reset the sound to start
          }, 30000);
        }
      }, 1000);
    });
  
    function updateTimerDisplay() {
      let minutes = Math.floor(totalTimeInSeconds / 60);
      let seconds = totalTimeInSeconds % 60;
  
      minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
      secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  
    function resetTimer() {
      isRunning = false;
      totalTimeInSeconds = 0;
      minutesDisplay.textContent = '00';
      secondsDisplay.textContent = '00';
      startTimerBtn.textContent = 'Start';
      startTimerBtn.classList.remove('red');
    }
  });
  
  
  