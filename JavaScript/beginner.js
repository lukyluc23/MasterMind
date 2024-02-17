let userName = localStorage.getItem("userName");
const dark = document.getElementById('switch');
const body = document.body;
const userColorOptions = JSON.parse(localStorage.getItem("userColorOptions"));
const winningCombination = generateRandomCombination(userColorOptions, 4);
const slotWin = document.querySelectorAll('.slot-win');
const slotSelection = document.querySelectorAll('.slot-selection');
const slotPlayer = document.querySelectorAll('.slot-player');

const userColorSelectionContainer1 = document.getElementById('userColorSelectionContainer1');
const userColorSelectionContainer2 = document.getElementById('userColorSelectionContainer2');
const userColorSelectionContainer3 = document.getElementById('userColorSelectionContainer3');
const userColorSelectionContainer4 = document.getElementById('userColorSelectionContainer4');

const firstShotTokens = document.getElementById('firstShot');
const secondShotTokens = document.getElementById('secondShot');
const thirdShotTokens = document.getElementById('thirdShot');
const fourtShotTokens = document.getElementById('fourthShot');
const fifthShotTokens = document.getElementById('fifthShot');
let currentShotToken = firstShotTokens;

const firstCheck = document.getElementById('firstCheck');
const secondCheck = document.getElementById('secondCheck');
const thirdCheck = document.getElementById('thirdCheck');
const fourthCheck = document.getElementById('fourthCheck');
const fifthCheck = document.getElementById('fifthCheck');
let currentCheck = firstCheck;

const removeButton = document.querySelector('.button-remove');
const checkButton = document.querySelector('.button-check');

let currentShot = [];
let currentAttempt = 0;

const showMessage = (userName, currentAttempt) => {
    let welcomeMessage = document.getElementById("welcomeMessage");
    let scoreMessage = document.getElementById("scoreMessage");
    welcomeMessage.textContent = `Buena suerte ${userName}!`;
    
}


showMessage(userName, currentAttempt);



for (let i = 0; i < userColorOptions.length; i++) {
    const color = userColorOptions[i];
    const slotSelectionElement = slotSelection[i];
    slotSelectionElement.style.backgroundColor = color;
}

function generateRandomCombination(colors, count) {
    const combination = [];
    while (combination.length < count) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        if (!combination.includes(randomColor)) {
            combination.push(randomColor);
        }
    }
    return combination;
};

function changeTokenColor(row, color) {
    const firstAvailableSlot = row.querySelector('.slot-player:not(.selected)');
    if (firstAvailableSlot) {
        firstAvailableSlot.style.backgroundColor = color;
        firstAvailableSlot.classList.add('selected');

    }
};

function checkUserCombination(array, rowCheck) {
    if (array.length === winningCombination.length) {
        const isDuplicate = hasDuplicates(array);
        if (isDuplicate) {
            alert('You cannot repeat colors in your combination.');
            return; 
        }
        function hasDuplicates(array) {
            return (new Set(array)).size !== array.length;
        }
        for (let i = 0; i < array.length; i++) {
            const userColor = array[i];
            const winnerColor = winningCombination[i];
            const tokenCheck = rowCheck.querySelector('.slot-check.check:nth-child(' + (i + 1) + ')');
            if (userColor === winnerColor) {
                tokenCheck.style.backgroundColor = 'purple';
            } else if (winningCombination.includes(userColor)) {
                tokenCheck.style.backgroundColor = 'black';
            }
        }
        if (JSON.stringify(winningCombination) === JSON.stringify(array)) {
            window.location.href = 'winner.html';
        } else {
            currentShot = []
            switch (currentAttempt) {
                case 0:
                    currentShotToken = secondShotTokens;
                    currentCheck = secondCheck;
                    currentAttempt++;
                    showMessageCurrentAttempt()
                    break;
                case 1:
                    currentShotToken = thirdShotTokens;
                    currentCheck = thirdCheck;
                    currentAttempt++;
                    showMessageCurrentAttempt()
                    break;
                case 2:
                    currentShotToken = fourtShotTokens;
                    currentCheck = fourthCheck;
                    currentAttempt++;
                    showMessageCurrentAttempt()
                    break;
                case 3:
                    currentShotToken = fifthShotTokens;
                    currentCheck = fifthCheck;
                    currentAttempt++;
                    showMessageCurrentAttempt()
                    break;
                default:
                    window.location.href = 'defeat.html';
                    break;
            }
        }
    } else {
        alert('Select at least 4 colors. They cannot be repeated');
    }
}

userColorSelectionContainer1.addEventListener('click', () => {
    changeTokenColor(currentShotToken, userColorOptions[0]);
    currentShot.push(userColorOptions[0]);
});
userColorSelectionContainer2.addEventListener('click', () => {
    changeTokenColor(currentShotToken, userColorOptions[1]);
    currentShot.push(userColorOptions[1]);
});
userColorSelectionContainer3.addEventListener('click', () => {
    changeTokenColor(currentShotToken, userColorOptions[2])
    currentShot.push(userColorOptions[2]);
});
userColorSelectionContainer4.addEventListener('click', () => {
    changeTokenColor(currentShotToken, userColorOptions[3])
    currentShot.push(userColorOptions[3]);
});

checkButton.addEventListener('click', () => {
    checkUserCombination(currentShot, currentCheck);
});

removeButton.addEventListener('click', () => {
    currentShotToken.querySelectorAll('.slot-player').forEach(slot => {
        slot.style.backgroundColor = '';
        slot.classList.remove('selected');
    });
    
    currentShot = [];
});

