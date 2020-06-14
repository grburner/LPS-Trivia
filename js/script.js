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
    console.log('startQuestions()')
    setQuestion(1)
    showModal()
    //setQuestion(1)
}

function setQuestion(questionIndex) {
    rightAnswerNumber = Math.floor(Math.random() * 4)
    questionArray = [0,1,2,3]
    console.log(questionArray)
    rightAnswerIndex = questionArray.indexOf(rightAnswerNumber);
    questionArray.splice(rightAnswerIndex, 1);

    selectQuestionField = document.getElementById("question-text")
    selectCorrectField = document.getElementById(`question-field-${rightAnswerNumber}`)

    getQuestion = questionObject.results[questionIndex].question
    getCorrectAnswer = questionObject.results[questionIndex].correct_answer
    selectQuestionField.innerHTML = getQuestion
    selectCorrectField.innerHTML = getCorrectAnswer
    getIncorrectAnswers = questionObject.results[questionIndex].incorrect_answers
    console.log(getIncorrectAnswers)
    console.log(questionArray)
    for (var i = 0; i < questionArray.length; i++) {
        document.getElementById(`question-field-${questionArray[i]}`).innerHTML = getIncorrectAnswers[i]
    }
};

function showModal() {
    $("#questionModal").modal();
};

