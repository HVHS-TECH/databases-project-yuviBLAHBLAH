const HTML_OUTPUT = document.getElementById('statusMessage')
console.log("runing website")

function writeForm() {
    // Get the form data
    let fruitPeople = GLOBAL_user.uid
    //const favoriteFruit = document.getElementById("favoriteFruit").value;
    const name = document.getElementById("name").value;
    const fruitQuantity = document.getElementById("fruitQuantity").value;
    console.log("fruitpplworks")

    firebase.database().ref('/' + fruitPeople).set(
        {
            name: name,
            //gameName: favoriteFruit,
            age: fruitQuantity,
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