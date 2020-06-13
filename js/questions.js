var questionObject 
function getQuestions() {
    fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelector}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
}

// category 11 = film
// catrogry 12 = music
// cateogry 18 = computers
// cateogry 19 = math