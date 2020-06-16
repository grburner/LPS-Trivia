 function getQuestions(cat) {
    console.log(cat)
    // if (cat === "MOVIES") {
    //     categorySelector = 11
    // } else if (cat === "MUSIC") {
    //     categorySelector = 12
    // } else if (cat === "COMPUTERS") {
    //     categorySelector = 18
    // } else if (cat === "MATH") {
    //     categorySelector = 19
    // }
    fetch(`https://opentdb.com/api.php?amount=10&category=${cat}&type=multiple`)
        .then(response => response.json())
        .then(data => questionObject = data)
}
