'use strict';



function setAlarm(event) {
    console.log('hello')
  let minutes = parseFloat(event.target.value);
  console.log('minutes is:', minutes)
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