'use strict';

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'icon.jpg',
      title:    'Time is up!',
      message:  'Time has expired! Now go play some games!\'',
      buttons: [
        {title: 'All done!'}
      ],
      priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});

chrome.browserAction.setBadgeText({text: 'XXX'})

chrome.runtime.onMessage.addListener(function(request) { 
  console.log('received message:', request)
  let timer = newTimer(request.seconds)
  timerStart(timer, function(timer) {
    console.log('timer seconds remaining:', timer.secondsRemaining)
    if (timerIsFinished(timer)) {
      console.log('Beep beep! All done.');
      
    } else {
      chrome.browserAction.setBadgeText({text: timerGetFormattedClock(timer)})
    }
  });
})