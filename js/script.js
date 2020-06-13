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
let startTimer = 3
let gameBtn = document.getElementById("startGameBtn")
let LBButton = document.getElementById("seeLeaderBoardBtn")
let timerSlot = document.getElementById("timer-slot")
let categorySelector
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
    getPlayerName()
    getCategory()
    getQuestions()
    let startTimeInterval = setInterval(() => {
        console.log(startTimer)
        timerSlot.innerHTML = startTimer
        startTimer--

        if( startTimer === 0 ) {
            clearInterval(startTimeInterval)
            startTimer = 3
            printQuestions()
        }
    }, 1000)
})

function getPlayerName() {
    playerName = prompt("What's your name?")
}

function getCategory() {
    categorySelector = prompt("pick a category")
}

function setQuestion(questionIndex) {
    getQuestion = questionObject.results[questionIndex].question
    getCorrectAnswer = questionObject.results[questionIndex].correct_answer
    getIncorrectAnswers = questionObject.results[questionIndex].incorrect_answers
    console.log(getQuestion)
    console.log(getCorrectAnswer)
    console.log(getIncorrectAnswers)
}

function printQuestions() {
    for (var i = 0; i < 9; i++) {
        setQuestion(i)
    }
}
    // button disappears
    // 3..2..1.. countdown timer
    // 60 second timer starts counting down by one second
        // while time !== 0
            // function nextQuestion() question & choices populate on modal
                // bold on hover
                // alert -> right answer 
                    // add points to playerScore
                // alert -> wrong answer
                    // deduct points from playerScore
            // function nextQuestion() 
        // if time === 0 
            // showScore
            // logScore
            // playAgain()
            