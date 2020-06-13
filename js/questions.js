var questionObject 
function getQuestions() {
    let categorySelector
    getCategory()
    fetch(`https://opentdb.com/api.php?amount=10&category=${categorySelector}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
}

function getCategory() {
    categorySelector = prompt("pick a category")
}

// category 11 = film
// catrogry 12 = music
// cateogry 18 = computers
// cateogry 19 = math