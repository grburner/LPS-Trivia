// WHEN the game is over * 
// THEN I can save my initials and score 

let gameReady = false
let timer = 10
let gameBtn = document.getElementById("startGameBtn")
let LBButton = document.getElementById("seeLeaderBoardBtn")
let categorySelector
let questionObject
let name

/*----- LEADERBOARD FUNCTIONS -----*/

LBButton.addEventListener("click", () => {
    showLeaderBoard();
});

function showLeaderBoard() {
    console.log("showLeaderBoard called")
}

/*----- GET PLAYER NAME FUNCTIONS -----*/

// click event listener to show the name bar
gameBtn.addEventListener("click", () => {
    getPlayerName(getCategory)
});

// show name bar, store input under name variable
function getPlayerName() {
    nameRowSelector = document.getElementById("name-row");
    nameRowSelector.classList.remove("d-none");
    $(document).ready(() => {
        $("#name-confirm").click((e) => {
            e.preventDefault();
            name = $("#name-input").val();
            nameRowSelector.classList.add("d-none")
            getCategory(name)
        });
    });
};

// show catergory list, save triviaCat variable and send to getQuestions function
function getCategory(name) {
    categoryRowSelector = document.getElementById("category-div");
    categoryRowSelector.classList.remove("d-none");
    var playerNode = document.createElement("h3");
    playerNode.innerHTML = `Let's play trivia ${name}! Pick a category by entering MOVIES, FILM, MATH or COMPUTERS`
    categoryRowSelector.insertBefore(playerNode, categoryRowSelector.firstChild);
    categoryRowSelector.addEventListener("click", (event) => {
        triviaCat = event.target.getAttribute("data-apiID")
        getQuestions(triviaCat)
    });
};

// FETCH function to get response array 
//  -> THEN class startQuestions function by passing in object
function getQuestions(cat, startQuestions) {
    console.log(cat)
    fetch(`https://opentdb.com/api.php?amount=11&category=${cat}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
        .then(obj => this.startQuestions(obj))
        /// ??? why do I need 'this' here
}

/*----- GAMEPLAY FUNCTIONS -----*/

// set score, question number, and decrement to false
//  -> showModal with questions, call setQuestion, call startTimer, call checkCorrect()
function startQuestions(obj) {
    score = 0
    questionNumber = 0
    decrement = false
    showModal()
    setQuestion(questionNumber)
    startTimer(timer)
    checkCorrect() 
}

// use JQuery to toggle modal visibility
function showModal() {
    $("#questionModal").modal();
};

// set modal elements with question, correct and incorrect answers
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

// starts the one second timer
//  -> reads decrement to determine if question was incorrect, if True, deduct 5seconds then reset to false
//  -> calls endGame function if timer is <= 0 or questionNumber === 10
function startTimer() {
    var myTimeStep = setInterval(function() { 
        if (decrement) {
            timer -= 5
            decrement = false
        } else if ( timer <= 0 || questionNumber === 10 ) {
            clearInterval(myTimeStep)
            endGame(name, score)
            // get time remaining variable out of function and add it to score?
        } else {
            console.log(timer); 
            timer = timer - 1
        };
    }, 1000);
}

// determins if the question is correct by looking at the data-istrue attribute and calls questionCorrect or questionIncorrect
function checkCorrect() {
    $("#questionModal").on("click", (event) => {
        if ( event.target.getAttribute("data-istrue") === "true" ) {
            questionCorrect()
        } else {
            questionIncorrect()
        }
    })
}

// adds 10 pts to score, increments questionNumber, calls setQuestion if game over conditions not met
function questionCorrect() {
    score += 10
    questionNumber++
    console.log(`Correct: score: ${score} + timer: ${timer} + questionNum: ${questionNumber}`)
    if ( timer >= 0 || questionNumber > 10 ) {
        setQuestion(questionNumber)
    }
}

// sets setDecrement to true, increments question number, calls setQuestion if game over conditions not met
function questionIncorrect() {
    questionNumber++
    setDecrement()
    console.log(`InCorrect: score: ${score} + timer: ${timer} + questionNum: ${questionNumber}`)
    if ( timer >= 0 || questionNumber > 10 ) {
        setQuestion(questionNumber)
    }
}

// set decrement to true, used in questionIncorrect function to decrement 5seconds
function setDecrement() {
    decrement = true
}

// function to end game and store name and score to localStorage
function endGame(name, score) {
    var oldScores = JSON.parse(localStorage.getItem('scoresArray')) || [];
    var newScore = {'name': name, 'score': score};
    oldScores.push(newScore);
    localStorage.setItem('scoresArray', JSON.stringify(oldScores))
};