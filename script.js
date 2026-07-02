console.log("does ts even work bru");
const HTML_OUTPUT = document.getElementById('statusMessage');

// Pass the game number and the score directly into the function when the game ends
function writeForm() {
    // Ensure a user is logged in
    if (!GLOBAL_user) {
        HTML_OUTPUT.innerText = "Error, No user logged in.";
        return;
    }


    let ID = GLOBAL_user.uid;

    //Get the Name from the form
    const userName = document.getElementById("name").value;

    //Get the Age from the form (using fruitQuantity ID)
    const ageInput = document.getElementById("userAge").value;
    const userAge = Number(ageInput); // Converts the text to a number

    //Hardcode the Game Number (since the form doesn't ask for it yet)
    const gameNumber = 1;

    //Set a default score of 0 (so the leaderboard doesn't break)
    const finalScore = 0;

    //Log it to the console to make sure we grabbed the age correctly
    console.log("Saving profile: " + userName + " (Age: " + userAge + ") for Game " + gameNumber);

    // Save everything to Firebase
    firebase.database().ref('scores/game_' + gameNumber + '/' + ID).set({
        username: userName,
        age: userAge,
        userUid: ID,
        score: finalScore,
        timestamp: Date.now() // this is so the latest score is shown at the top fpr tiebreakers
    })
        .then(function () {
            HTML_OUTPUT.innerText = "Profile saved successfully!";
        })
        .catch(function (error) {
            console.error("Firebase write failed: ", error);
            HTML_OUTPUT.innerText = "Failed to save profile.";
        });
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

function displayLeaderboard() {
    const leaderboardList = document.getElementById('flappyHorseLeaderboard');

    // LOOK HERE: Make sure there is a dot (.) before orderByChild and limitToLast
    const scoresRef = firebase.database().ref('scores/game_1').orderByChild('score').limitToLast(5);

    scoresRef.on('value', function (snapshot) {
        leaderboardList.innerHTML = '';
        const scoresArray = [];

        snapshot.forEach(function (childSnapshot) {
            const data = childSnapshot.val();
            scoresArray.push(data);
        });

        scoresArray.reverse();

        for (let i = 0; i < scoresArray.length; i++) {
            const player = scoresArray[i];
            const listItem = document.createElement('li');
            listItem.innerText = player.username + " - " + player.score + " points";
            leaderboardList.appendChild(listItem);
        }

        if (scoresArray.length === 0) {
            leaderboardList.innerHTML = '<li>No high scores yet. Be the first!</li>';
        }

        // if a user logs in, update the link to include their unique id so the game knows who they are
        if (typeof GLOBAL_user !== 'undefined' && GLOBAL_user) {
            const flappyLink = document.getElementById("flappyLink");
            if (flappyLink) {
                flappyLink.href = "programming-project-yuviBLAHBLAH-main/playGame.html?uid=" + GLOBAL_user.uid;
            }
        }
    }, function (error) {
        console.error("Error reading scores from Firebase: ", error);
        leaderboardList.innerHTML = '<li>Failed to load scores.</li>';
    });
}

// Run the function
displayLeaderboard();