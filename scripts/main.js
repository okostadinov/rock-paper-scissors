/*  Computes the AI's  choice based on
 *  a random float between 0 and 1.
 */

function computerSelectChoice() {
    randomInt = Math.random();
    if (randomInt <= 0.33) {
        return "Rock";
    } else if (randomInt > 0.66) {
        return "Paper";
    }
    return "Scissors";
}

/*  Takes the click event as a paremeter in order to extract its target.
 *  Based on it, returns the choice which the player has made.
 */
function playerSelectChoice(e) {
    if (e.target.id === 'btnRock') {
        return 'Rock';
    } else if (e.target.id === 'btnPaper') {
        return 'Paper';
    }
    return 'Scissors';
}

/*  Extracts the player's choice and computer that of the AI.
 *  Calculates the result and adds it to the current score.
 *  Checks if either the player or the AI has reached 5 points.
 */
function playRound(e) {
    let playerChoice = playerSelectChoice(e);
    let computerChoice = computerSelectChoice();
    let playerScore = divPlayerScore.textContent;
    let computerScore = divComputerScore.textContent;

    if (playerChoice === "Rock") {
        if (computerChoice === "Rock") {
            divRoundResult.textContent = 'This round is a draw.';
        } else if (computerChoice === "Paper") {
            divRoundResult.textContent = 'You lose! Paper beats Rock.';
            computerScore++;
        } else {
            divRoundResult.textContent = 'You win! Rock beats Scissors.';
            playerScore++;
        }
    } else if (playerChoice === "Paper") {
        if (computerChoice === "Rock") {
            divRoundResult.textContent = 'You win! Paper beats Rock.';
            playerScore++;
        } else if (computerChoice === "Paper") {
            divRoundResult.textContent = 'This round is a draw.';
        } else {
            divRoundResult.textContent = 'You lose! Scissors beat Paper.';
            computerScore++;
        }
    } else {
        if (computerChoice === "Rock") {
            divRoundResult.textContent = 'You lose! Rock beats Scissors.';
            computerScore++;
        } else if (computerChoice === "Paper") {
            divRoundResult.textContent = 'You win! Scissors beat Paper.';
            playerScore++;
        } else {
            divRoundResult.textContent = 'This round is draw.';
        }
    }
    // Update the divs storing the scores.
    divPlayerScore.textContent = playerScore;
    divComputerScore.textContent = computerScore;
    checkScore();
}

/*  Checks if either the player or the computer has reached 5 points.
 *  If yes, alert the player of the end result and nullifies the score.
 *  Otherwise continues as is.
 */ 
function checkScore() {
    let playerScore = divPlayerScore.textContent;
    let computerScore = divComputerScore.textContent;

    if (playerScore >= 5) {
        parVictoryOrDefeat.textContent = 'Congratulations! You have beaten the infamous AI!';
        openModal();
    }

    if (computerScore >= 5) {
        parVictoryOrDefeat.textContent = 'The Gods have turned their backs on you. All hope is lost...';
        openModal();
    }
    return;
}

/*  Creates and opens an window notifying the user whether
 *  he won or lost. A button allowing for restarting the game
 *  has been added, such that the score is reset.
 */
function openModal() {
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modal-window');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    btnReset.textContent = 'Continue fighting!';
    btnReset.classList.add('centered');
    btnReset.addEventListener('click', () => {
        playerScore = computerScore = 0;
        divPlayerScore.textContent = playerScore;
        divComputerScore.textContent = computerScore;
        modalWindow.setAttribute('style', 'display: none');
        divRoundResult.textContent = '';
    });

    modalContent.appendChild(parVictoryOrDefeat);
    modalContent.appendChild(btnReset);
    modalWindow.appendChild(modalContent);
    container.appendChild(modalWindow);
}

// Main container
const container = document.querySelector('#container');

// Static paragraph at top
const parChooseWeaponText = document.createElement('p');
parChooseWeaponText.setAttribute('id', 'chooseWeaponText');
parChooseWeaponText.textContent = 'What shall be your weapon of choice?';
container.appendChild(parChooseWeaponText);

// Div grouping the three choices
const divBtnsContainer = document.createElement('div');
divBtnsContainer.setAttribute('id', 'btnsContainer');

const btnRock = document.createElement('button');
const btnPaper = document.createElement('button');
const btnSciss = document.createElement('button');

btnRock.classList.add('btn');
btnRock.setAttribute('id', 'btnRock');
btnPaper.classList.add('btn');
btnPaper.setAttribute('id', 'btnPaper');
btnSciss.classList.add('btn');
btnSciss.setAttribute('id', 'btnSciss');

divBtnsContainer.appendChild(btnRock);
divBtnsContainer.appendChild(btnPaper);
divBtnsContainer.appendChild(btnSciss);
container.appendChild(divBtnsContainer);

// Save the buttons into an array and add a click event to each calling playRound()
const btns = Array.from(document.querySelectorAll('.btn'));
btns.forEach(btn => btn.addEventListener('click', playRound));

// Div grouping the scores throughout the round
const divScoreboard = document.createElement('div');
divScoreboard.setAttribute('id', 'scoreboard');

const divPlayerScore = document.createElement('div');
const divComputerScore = document.createElement('div');
const parPlayer = document.createElement('p');
const parComputer = document.createElement('p');
parPlayer.textContent = 'You: ';
parComputer.textContent = 'AI: ';
divPlayerScore.textContent = '0';
divComputerScore.textContent = '0';
divScoreboard.appendChild(parPlayer);
divScoreboard.appendChild(divPlayerScore);
divScoreboard.appendChild(parComputer);
divScoreboard.appendChild(divComputerScore);
container.appendChild(divScoreboard);

// Div displaying the result of each round
const divRoundResult = document.createElement('div');
divRoundResult.classList.add('centered');
container.appendChild(divRoundResult);

// Contains the end result of the game and is added to the popup modal
const parVictoryOrDefeat = document.createElement('p');
parVictoryOrDefeat.classList.add('centered');

// Added to the popup modal after the BO5, allowing to restart the game
const btnReset = document.createElement('button');
btnReset.classList.add('centered');
btnReset.setAttribute('id', 'btnReset');