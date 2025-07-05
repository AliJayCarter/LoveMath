document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");
    for(let button of buttons) {
        button.addEventListener("click", function() {
            if(this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }
    //Start the game by calling the runGame function with "addition" as the game type.
    runGame("addition");

});
/**
 * The main game "loop" call when the script us first loaded.
 * and after the uers has answered the question.
 */
function runGame(gameType) {
    //Creaes two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if(gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if(gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if(gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if(gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`;
    }
}
/**
 * Checks the user's answer against the correct answer 
 * and updates the score accordingly.
 */
function checkAnswer(){
    //Get the user's answer from the DOM
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    //Get the correct answer from the calculateCorrectAnswer function
    let correctAnswer = calculateCorrectAnswer();
    //Check if the user's answer is correct
    if(userAnswer === correctAnswer[0]) {
        alert("Correct!");
        incrementScore();
    } else {
        alert(`Wrong! The correct answer was ${correctAnswer[0]}`);
        incrementWrongAnswer();
    }
    //Clear the input box for the next question
    document.getElementById("answer-box").value = "";
    runGame(correctAnswer[1]);
}
/**
 * Gets the operands (the numbers) and the operator
 * directly from the DOM and returns the correct answer.
 */
function calculateCorrectAnswer(){
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if(operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    }else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        //If the operator is not recognized, alert the user and throw an error
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}
/**
 * Increments the user's score by 1.
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}
/**
 * Increments the user's incorrect answer count by 1.
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2){
    // Note: The operands should be set such that operand1 is greater than operand2 to
    // avoid negative results, or you can handle negative results in your logic.
    // For example, you can swap the operands if operand1 is less than operand2.
    if(operand1 < operand2) {
        let temp = operand1;
        operand1 = operand2;
        operand2 = temp;
    }
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2){
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "*";

}

function displayDivisionQuestion(operand1, operand2){
    // Ensure operand2 is not zero to avoid division by zero errors
    if(operand2 === 0) {
        operand2 = 1; // or handle it in a way that suits your game logic
    }
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";  

}