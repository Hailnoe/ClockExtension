'use strict';
let activeTimer;

chrome.storage.onChanged.addListener(function(changes, namespace) {
  let timer = changes.timer.newValue;
  if (timerIsFinished(changes.timer.newValue)) {
    console.log('Beep beep! All done.');
    let reward = document.getElementById('your-reward')
      if (reward) {
      reward.innerHTML='<a target="_blank" href="https://obsolete-paste.surge.sh">Your reward!</a>'; }
  //  } reward.innerHTML='<a href="level-knowledge.surge.sh">your-reward</a>';
  }
  if (changes.hasOwnProperty('timer'))  {
    let timer = changes.timer.newValue
    console.log('timer is:', timer)
    let timerDisplay = document.getElementById('timer-display')
    timerDisplay.innerText = timerGetFormattedClock(timer)
  }
});

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ABC'});

  // chrome.alarms.create({delayInMinutes: minutes});
  // chrome.storage.sync.set({minutes: minutes});
  chrome.runtime.sendMessage({ action: 'start_timer', seconds: minutes*60})
  
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: 'OFF'});
  chrome.alarms.clearAll();
}

document.getElementById('sampleMinute').addEventListener('click', setAlarm);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('45min').addEventListener('click', setAlarm);
document.getElementById('60min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);