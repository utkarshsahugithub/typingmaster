let typingTextBox = document.querySelector('.typingTextBox')
let restartButton = document.querySelector('.restartButton')
let theTimer = document.querySelector('.timer');
let originText = document.querySelector('.typingGivenText').innerHTML;

let timerArray = [0, 0, 0, 0];
let interval;
let timerRunningFlag =false;

function zeroAtFront(time) {
    if(time <= 9) {
        time = "0"+time;
    }
    return time;
}

function runTimer() {
    timerArray[0] = Math.floor((timerArray[3]/100)/60);
    timerArray[1] = Math.floor((timerArray[3]/100) - (timerArray[0] * 60));
    timerArray[2] = Math.floor(timerArray[3] - (timerArray[1] * 100) - (timerArray[0] * 6000));
    
    let currentTime = zeroAtFront(timerArray[0]) + ":" + zeroAtFront(timerArray[1]) + ":" + zeroAtFront(timerArray[2]);
    theTimer.innerHTML = currentTime;
    timerArray[3]++;
}

function spellCheck() {
    let textEntered = typingTextBox.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    if(textEntered == originText) {
        clearInterval(interval);
        typingTextBox.style.borderColor = "#64BEAE ";
    } else {
        if(textEntered == originTextMatch) {
            typingTextBox.style.borderColor = "#dc67cb ";
        } else {
            typingTextBox.style.borderColor = "red";
        }
    }
}

function startTimer() {
    let textEnteredLength = typingTextBox.value.length;
    if(textEnteredLength === 0 && !timerRunningFlag) {
       timerRunningFlag = true;
       interval =  setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunningFlag = false;
    typingTextBox.value = "";
    theTimer.innerHTML = "00:00:00";
    typingTextBox.style.borderColour = "grey";
}
typingTextBox.addEventListener("keypress", startTimer, false);
typingTextBox.addEventListener("keyup", spellCheck, false);
restartButton.addEventListener("click", reset, false);