const HTML_OUTPUT = document.getElementById('statusMessage');
console.log("running website");

// Pass the game number and the score directly into the function when the game ends
function writeForm(gameNumber = 1, scoreFromGame = 0) {
    // Ensure a user is logged in
    if (!GLOBAL_user) {   // note to serlf the ! means not as --> not global user
        HTML_OUTPUT.innerText = "Error, No user logged in.";
        return;
    }

    let ID = GLOBAL_user.uid 

    // Get the name from your HTML input element
    const playerName = document.getElementById("name").value;

    // Ensure the score is treated as a number, not text
    const finalScore = Number(scoreFromGame);
    console.log("Saving score for Game " + gameNumber + ": " + playerName + " got " + finalScore);

    // Save to Firebase
    // /scores/game_number/user_uid
    firebase.database().ref('scores/game_' + gameNumber + '/' + ID).set({
        username: playerName,
        userUid: ID,
        score: finalScore,
        timestamp: Date.now() // This is to break ties by having the most recent score on top
    })
        .then(function () {
            HTML_OUTPUT.innerText = "Score saved successfully!";
        })
        .catch(function (error) {
            console.error("Firebase write failed: ", error);
            HTML_OUTPUT.innerText = "Failed to save score.";
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
    const LeaderboardList = document.getElementById('flappyHorseleaderboard');
    const scoresRef = firebase.database().ref('scores/game_1')orderByChild('score').limitToLast(5);

    scoresRef.on('value',fucntion(snapshot)) {
        LeaderboardList.innerHTML = '';
        const scoresArray = [];

        snapshot.forEach(function(childSnapshot)){
            const data = childSnapshot.val();
            scoresArray.push(data);
        }
    }
}
 scoresArray.reverse();

 for (let i = 0; i < scoresArray.Length; i++) {
    const player = scoresArray[i];
    const listItem = document.createElement('li');
    listItem.innerText = player.username + " - " + player.score + " points";
    leaderboardList.appendChild(listItem);
 }

if (scoresArray.lenght === 0) {
    leaderboardList.innerHTML = '<li>No current highscore, play the game</li>';
}

// run the function as soon as the script loads
displayLeaderboard(); 