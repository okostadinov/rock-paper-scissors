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

/*  Prompts user for input.
 *  Normalizes the input to first letter uppercase,
 *  and the rest of the string to lowercase.
 *  In case the input is not "Rock", "Paper" or "Scissors",
 *  call again until user provides correct input.
 *  Once done, return the player's choice.
 */
function playerSelectChoice() {
    let initPlayerChoice;
    while (!initPlayerChoice) {
        initPlayerChoice = prompt("Your choice: ");
    }
    let playerChoice = initPlayerChoice.charAt(0).toUpperCase() + 
        initPlayerChoice.slice(1).toLowerCase();
    if (playerChoice === "Rock" || 
        playerChoice === "Paper" || 
        playerChoice === "Scissors") {
            return playerChoice;
    }
    return playerSelectChoice();
}

/*  Calls for computation of both the computer
 *  and the player's choices, followed by comparing
 *  the result and returning one of three values:
 *      1 - in case the player won the round;
 *      2 - in case the player lost the round;
 *      0 - in case it was a draw;
 */
function playRound() {
    let playerChoice = playerSelectChoice();
    let computerChoice = computerSelectChoice();

    if (playerChoice === "Rock") {
        if (computerChoice === "Rock") {
            console.log("This round is draw.");
            return 0;
        } else if (computerChoice === "Paper") {
            console.log("You lose! Paper beats Rock.");
            return 2;
        } else {
            console.log("You win! Rock beats Scissors.");
            return 1;
        }
    } else if (playerChoice === "Paper") {
        if (computerChoice === "Rock") {
            console.log("You win! Paper beats rock.");
            return 1;
        } else if (computerChoice === "Paper") {
            console.log("This round is a draw.");
            return 0;
        } else {
            console.log("You lose! Scissors beat Paper.");
            return 2;
        }
    } else {
        if (computerChoice === "Rock") {
            console.log("You lose! Rock beats Scissors.");
            return 2;
        } else if (computerChoice === "Paper") {
            console.log("You win! Scissors beat Paper.");
            return 1;
        } else {
            console.log("This round is a draw.");
            return 0;
        }
    }
}

/*  Plays five round of rock-paper-scissors
 *  by calling the playRound() f-n in a loop.
 *  Each time the return value is considered
 *  in order to keep track of the score.
 *  At the end, prints whether the player won or lost,
 *  or if the game was a draw.
 */
function game() {
    let playerScore = computerScore = roundResult = 0;
    for (i = 0; i < 5; i++) {
        roundResult = playRound();
        if (roundResult === 1) {
            playerScore++;
        } else if (roundResult === 2) {
            computerScore++;
        }
    }
    if (playerScore > computerScore) {
        console.log("You win the game!");
    } else if (playerScore < computerScore) {
        console.log("You lose the game.");
    } else {
        console.log("It's a draw this time.");
    }
}