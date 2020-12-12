const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateElem = document.getElementById("date-picker");
const alertMsg = document.getElementById("alert");

const countdownElem = document.getElementById("countdown");
const countdownElemTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeElem = document.getElementById("complete");
const completeElemInfo = document.getElementById("complete-info");
const completeBtn = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split("T")[0];
// Set the Date to current day and disable previous days for our user not be able to select them
dateElem.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
    const distance = countdownValue - now;
    
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // Hide Input
    inputContainer.hidden = true;

    // If the countdown ended, shop complete
    if(distance < 0) {
        countdownElem.hidden = true;
        clearInterval(countdownActive);
        completeElemInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeElem.hidden = false;
    } else {
        // Show the countdown in progress
        // Populate Countdown
        countdownElemTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeElem.hidden = true;
        countdownElem.hidden = false
    }
    }, second);
}

// Cache Values from our Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    // Check for Valid date
    if(countdownDate === "") {
        alertMsg.hidden = false;
        alertMsg.textContent = "Please select a valid date!";
    } else {
        // Get number version of current Date, updateDOM
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
function reset(){
    // Hide Countdowns, Show Input
    countdownElem.hidden = true;
    completeElem.hidden = true;
    inputContainer.hidden = false;
    alertMsg.hidden = true;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = "";
    countdownDate = "";
}

// Event Listener
countdownForm.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeElem.addEventListener("click", reset);
