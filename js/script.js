let gameReady = false
let time = 10
let categorySelector
let questionObject
let name
let endGameRow = document.getElementById("end-game-prompt")
let endGameText = document.getElementById("end-game-text")
let playAgainBtn = document.getElementById("play-again-btn")
let seeScoresBtn = document.getElementById("see-scores-btn")
let playerNode = document.createElement("h3")
let gameBtn = document.getElementById("startGameBtn")
let LBButton = document.getElementById("seeLeaderBoardBtn")
let timeRemaining = document.getElementById("time-remaining")
let scoreSection = document.getElementById("score-section")

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
    if ( !endGameRow.classList.contains("d-none") ) {
        endGameRow.classList.add("d-none")
    }
    setPlayerName()
};

// jquery to get player name from bootstrap input field ***BEING CALLED TWICE 2ND TIME THRU***
function setPlayerName () {
    $(document).ready(() => {
        // called once here
        $("#name-confirm").unbind("click");
        $("#name-confirm").on("click", (e) => {
            // called twice here`
            e.preventDefault();
            name = $("#name-input").val();
            nameRowSelector.classList.add("d-none")
            getCategory(name)
        });
    });
}


// show catergory list, save triviaCat variable and send to getQuestions function
function getCategory(name) {
    categoryRowSelector = document.getElementById("category-div");
    categoryRowSelector.classList.remove("d-none");
    playerNode.innerHTML = `Let's play trivia ${name}! Pick a category by entering MOVIES, FILM, MATH or COMPUTERS`
    categoryRowSelector.insertBefore(playerNode, categoryRowSelector.firstChild);
    $(document).ready(() => {
        $("#category-div").unbind("click");
        $("#category-div").on("click", (e) => {
            e.preventDefault();
            triviaCat = event.target.getAttribute("data-apiID")
            getQuestions(triviaCat)
    // categoryRowSelector.removeEventListener("click", )
    // categoryRowSelector.addEventListener("click", (event) => {
    //     triviaCat = event.target.getAttribute("data-apiID")
    //     getQuestions(triviaCat)
        });
    });
};

function removeElement(element) {
    element.remove()
}

// FETCH function to get response array 
//  -> THEN class startQuestions function by passing in object
function getQuestions(cat, startQuestions) {
    fetch(`https://opentdb.com/api.php?amount=11&category=${cat}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
        .then(obj => this.startQuestions(obj))
        /// ??? why do I need 'this' here
    removeElement(playerNode)
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
    startTimer(time)
    checkCorrect() 
}

// use JQuery to toggle modal visibility
function showModal() {
    $("#questionModal").modal('toggle');
};

// function hideModal() {

// };

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
            time -= 5
            timeRemaining.innerHTML = time
            decrement = false
        } else if ( time <= 0 || questionNumber === 10 ) {
            console.log('time: ' + time + ' questionNumber: ' + questionNumber)
            clearInterval(myTimeStep)
            endGame(name, score)
        } else {
            console.log(time); 
            time = time - 1
            timeRemaining.innerHTML = time
        };
    }, 1000);
}

// determins if the question is correct by looking at the data-istrue attribute and calls questionCorrect or questionIncorrect
function checkCorrect() {
    $("#questionModal").unbind("click");
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
    console.log('caller of questionCorrect: ' + questionCorrect.caller)
    score += 10
    questionNumber++
    console.log(`Correct: score: ${score} + time: ${time} + questionNum: ${questionNumber}`)
    if ( time >= 0 || questionNumber > 10 ) {
        setQuestion(questionNumber)
    }
}

// sets setDecrement to true, increments question number, calls setQuestion if game over conditions not met
function questionIncorrect() {
    console.log('caller of questionIncorrect: ' + questionIncorrect.caller)
    questionNumber++
    setDecrement()
    console.log(`InCorrect: score: ${score} + time: ${time} + questionNum: ${questionNumber}`)
    if ( time >= 0 || questionNumber > 10 ) {
        setQuestion(questionNumber)
    }
}

// set decrement to true, used in questionIncorrect function to decrement 5seconds
function setDecrement() {
    decrement = true
}

// function to end game and store name and score to localStorage
function endGame(name, score) {
    console.log('name: '+ name + ' score: ' + score +' timer: ' + time + ' endGame called by: ' + endGame.caller)
    var oldScores = JSON.parse(localStorage.getItem('scoresArray')) || [];
    var newScore = {'name': name, 'score': score};
    questionNumber = 0
    time = 10
    oldScores.push(newScore);
    localStorage.setItem('scoresArray', JSON.stringify(oldScores))
    endGamePrompt()
};

function endGamePrompt() {
    showModal()
    endGameRow.classList.remove("d-none")
    categoryRowSelector.classList.add("d-none");
    endGameText.innerHTML = `Congrats ${name}, you made it! Do you want to:`
    endGameRow.addEventListener("click", (event) => {
        if ( event.target.id === "play-again-btn" ) {
            getPlayerName(getCategory)
            resetScoreSection()
        } else if ( event.target.id === "see-scores-btn" ) {
            console.log(`show scores`)
        }
    });
    showHighScores()
};

function resetScoreSection() {
    scoreSection.classList.add("d-none")
    while (scoreSection.firstChild) {
        scoreSection.removeChild(scoreSection.lastChild);
    };
};

function showHighScores() {
    scores = JSON.parse(localStorage.getItem("scoresArray"))
    console.log(scores)
    sortFunc = scores.sort(function (a, b) {
        return b.score - a.score;
    });
    scoreSection.classList.remove("d-none")
    console.log(scoreSection)
    for(var i = 0; i < 4; i++ ) {
        rankArray = [1,2,3,4,5]
        let scoreDiv = document.createElement("h5")
        scoreDiv.innerHTML = `${rankArray[i]} - ${sortFunc[i].name}: ${sortFunc[i].score}`
        scoreSection.appendChild(scoreDiv)
    };
    console.log(scoreSection)
}

/* ---- ISSUES ---- */
// - show leaderboard
// make leaderboard page
// clear local memory
// make clear localStorage button
// made a correct / incorrect marker in the modal