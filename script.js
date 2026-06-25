const HTML_OUTPUT = document.getElementById('statusMessage')
console.log("runing website")

function writeForm() {
    // Get the form data
    let ID = GLOBAL_user.uid
    //const favoriteFruit = document.getElementById("favoriteFruit").value;
    const name = document.getElementById("name").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;
    console.log("getting name,score and game number works")

    firebase.database().ref('/' + ID).set(
        {
            game: game number // user the () in a function to get the score from the game, can use multiple for getting multiple values at a time
            user: ID
            score: score from last played game
        }
    )
}
function list() {
    console.log("Running list()")
    firebase.database().ref('/').set(
        {
            sector1: {
                consumers: {
                }
            }
        }
    )
}

