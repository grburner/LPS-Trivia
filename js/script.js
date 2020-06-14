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
// click button to see leaderboard and directions
    // modal with leaderboard and instuctions
    // any click goes back to home page
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
        console.log('into set interval function' + questionObject)
        if (questionObject !== undefined) {
            startQuestions()
            clearInterval(checkAJAX)
        }
    }, 1000)
});

function startQuestions() {
    score = 0
}

function getPlayerName() {
    playerName = prompt("What's your name?")
    return playerName
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

function getCategory(name) {
    gameCat = prompt(`Let's play trivia ${name}! Pick a category by entering MOVIES, FILM, MATH or COMPUTERS`)
    return confirmCat(gameCat)
}

function setQuestion(questionIndex) {
    getQuestion = questionObject.results[questionIndex].question
    getCorrectAnswer = questionObject.results[questionIndex].correct_answer
    getIncorrectAnswers = questionObject.results[questionIndex].incorrect_answers
    console.log(getQuestion)
    console.log(getCorrectAnswer)
    console.log(getIncorrectAnswers)
};

function printQuestions() {
    for (var i = 0; i < 9; i++) {
        setQuestion(i)
    };
};
