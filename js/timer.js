// Main ideas:
// 1. Explicitly model all aspects of the timer
//    - A question like "How many seconds on the clock" should have
//      one and only one source of truth in the code.
//    - Have many tiny, single-purpose functions that correspond as
//      literally as possible to what the timer is doing
// 2. Separate the concerns:
//    - Input logic
//    - Business logic
//    - Display logic

// Keep track of whether the timer is paused, counting down, or finished.
// Using constants like this is helpful because it's easy to type something
// like 'PUASE' and not notice the typo. TIMER_STATES.PUASE will give us
// undefined and make it more obvious when we make a mistake.
let TIMER_STATES = {
    PAUSED: 'PAUSED',
    COUNTING: 'COUNTING',
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED',
  }
  
  function newTimer(startingSeconds) {
    if (startingSeconds === undefined) {
      startingSeconds = 0;
    }
  
    // Keep track of startingSeconds so we can "restart" the timer
    // with its original duration. Start in the PAUSED state.
    return {
      state: TIMER_STATES.PAUSED,
      startingSeconds: startingSeconds,
      remainingSeconds: startingSeconds,
    };
  }
  
  // Using timerIsFinished(timer) will guarantee our code is typo-free
  // and allows us to change the logic we use to determine if timer is
  // stopped without changing any other part of the code
  function timerIsFinished(timer) {
    return timer.state === TIMER_STATES.FINISHED;
  }
  
  function timerIsCounting(timer) {
    return timer.state === TIMER_STATES.COUNTING;
  }
  
  function timerTick(timer) {
    timer.remainingSeconds -= 1;
  
    if (timer.remainingSeconds <= 0) {
      timer.state = TIMER_STATES.FINISHED;
    }
  }
  
  function timerGetMinutes(timer) {
    return Math.floor(timer.remainingSeconds / 60);
  }
  
  function timerGetSeconds(timer) {
    return timer.remainingSeconds % 60;
  }
  
  // Isolate the display/output logic
  // The timer only tracks seconds and this function
  // gives us a more display-friendly string
  function timerGetFormattedClock(timer) {
    let min = timerGetMinutes(timer);
    let sec = timerGetSeconds(timer);
  
    if (sec < 10) {
      return `${min}:0${sec}`;
    } else {
      return `${min}:${sec}`;
    }
  }
  
  function displayTimer(timer) {
    console.log(timerGetFormattedClock(timer));
  }
  
  function timerReset(timer) {
    timer.state = TIMER_STATES.PAUSED;
    timer.remainingSeconds = timer.startingSeconds;
  }
  
  function timerStart(timer, onEachTick) {
    timer.state = TIMER_STATES.COUNTING;
  
    countdown(timer, onEachTick);
  }
  
  function countdown(timer, onEachTick) {
    onEachTick(timer);
  
    // If the timer is finished, stop counting down
    if (timerIsFinished(timer)) {
      return;
    }
  
    timerTick(timer);
  
    // Queue up another countdown tick 1 second from now
    setTimeout(function() {
      countdown(timer, onEachTick);
    }, 1000);
  }
  
  function pauseTimer(params) {
    
  }
//   let timer = newTimer(12);
  
//   // The callback function we pass in here is called once
//   // for every tick of the countdown. We can do whatever we
//   // want on each tick. In this case, we print out the time
//   // remaining.
//   timerStart(timer, function(timer) {
//     if (timerIsFinished(timer)) {
//       console.log('Beep beep! All done.');
//     } else {
//       displayTimer(timer);
//     }
//   });
  
  /**
   * To illustrate the power of separation of concerns, the below timer
   * call now updates part of a webpage on every tick. The only difference
   * is the callback function we pass to timerStart.
   **/
  // timerStart(timer, function(timer) {
  //   let minutesDisplay = document.querySelector('#display-minutes');
  //   let secondsDisplay = document.querySelector('#display-seconds');
  
  //   let currentMinutes = timerGetMinutes(timer);
  //   let currentSeconds = timerGetSeconds(timer);
  
  //   minutes.innerText =  currentMinutes;
  //   seconds.innerText = currentSeconds;
  // });