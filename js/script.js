// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

let gameReady = false
let timer = 60
let gameBtn = document.getElementById("startGameBtn")
let LBButton = document.getElementById("seeLeaderBoardBtn")
let categorySelector
let questionObject

LBButton.addEventListener("click", () => {
    showLeaderBoard();
});

function showLeaderBoard() {
    console.log("showLeaderBoard called")
}

// click button to start game
gameBtn.addEventListener("click", () => {
    let playerName = getPlayerName()
    let triviaCat = getCategory(playerName)
    getQuestions(triviaCat)


    let checkAJAX = setInterval(() => {
        if (questionObject !== undefined) {
            console.log("into if statement")
            startQuestions()
            clearInterval(checkAJAX)
        } else {
            console.log("into else statement")
        }
    }, 1000)
});

function getPlayerName() {
    playerName = prompt("What's your name?")
    return playerName
}

function getCategory(name) {
    gameCat = prompt(`Let's play trivia ${name}! Pick a category by entering MOVIES, FILM, MATH or COMPUTERS`)
    return confirmCat(gameCat)
}

function confirmCat(gameCat) {
    let acceptableCategories = ['MOVIES', 'FILM', "MATH", "COMPUTERS"]
    if (acceptableCategories.includes( gameCat )) {
        console.log(gameCat)
        return gameCat
    } else {
        console.log('back to get category')
        getCategory()
    }
}

function startQuestions() {
    score = 0
    questionNumber = 0
    decrement = false
    showModal()
    setQuestion(questionNumber)
    startTimer(timer)
    checkCorrect() 
}

function checkCorrect() {
    $("#questionModal").on("click", (event) => {
        if ( event.target.getAttribute("data-istrue") === "true" ) {
            questionCorrect()
        } else {
            questionIncorrect()
        }
    })
}

function questionCorrect() {
    console.log('questionCorrect function')
    score += 10
    questionNumber++
    console.log(`${score} + ${timer} + ${questionNumber}`)
    if ( timer !== 0 && questionNumber < 9 ) {
        setQuestion(questionNumber)
    } else {
        endGame(score)
    }
}

function questionIncorrect() {
    console.log('questionIncorrect function')
    questionNumber++
    setDecrement()
    console.log(`${score} + ${timer} + ${questionNumber}`)
    if ( timer !== 0 && questionNumber < 9 ) {
        setQuestion(questionNumber)
    } else {
        endGame(score)
    }
}

function setDecrement() {
    decrement = true
}

function startTimer(time) {
    setInterval(function() { 
        if (decrement) {
            console.log(time)
            time -= 5
            decrement = false
        } else
            console.log(time); 
            time = time - 1
    }, 1000);
}

function endGame() {
    console.log( 'endGame function ' + score );
};

/* set modal elements with question, correct and incorrect answers */
function setQuestion(questionIndex) {
    rightAnswerNumber = Math.floor(Math.random() * 4)
    // generates a random number to set the correct answer
    questionArray = [0,1,2,3]
    // array of possible question indexes
    questionArray.splice(rightAnswerNumber, 1);
    // removes the index of the right answer

    selectQuestionField = document.getElementById("question-text")
    selectCorrectField = document.getElementById(`question-field-${rightAnswerNumber}`)
    selectCorrectButton = document.getElementById(`button-${rightAnswerNumber}`)
    // select the question and correct answer elements

    selectQuestionField.innerHTML = questionObject.results[questionIndex].question
    selectCorrectField.innerHTML = questionObject.results[questionIndex].correct_answer
    selectCorrectButton.dataset.istrue = "true"
    // populate correct answer and question elements

    getIncorrectAnswers = questionObject.results[questionIndex].incorrect_answers
    // create an array of incorrect answers 

    for (var i = 0; i < questionArray.length; i++) {
        document.getElementById(`question-field-${questionArray[i]}`).innerHTML = getIncorrectAnswers[i]
        document.getElementById(`button-${questionArray[i]}`).dataset.istrue = "false"
    }
    // loop through the array of remaining answer indexs and set a correct answer at each 
};

/* use JQuery to toggle modal visibility */
function showModal() {
    $("#questionModal").modal();
};

