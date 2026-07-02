/*******************************************************/
// P5.play: playGame
// start the game
/// Written by yuvi
/*******************************************************/
// load the display image for the horse
function preload() {

	imgHorsi = loadImage('Images/horsi g.png');
	imgBG = loadImage('Images/background.jpg');
}
let score = 0
let stars = []
/*******************************************************/
// setup()
/*******************************************************/
function setup() {

	const firebaseConfig = {
		apiKey: "AIzaSyAqQNSvHNkBM_ZfS-RaiAlN1tzUKDSrqSQ",
		authDomain: "comp-2025-yuvraj-bhatt.firebaseapp.com",
		databaseURL: "https://comp-2025-yuvraj-bhatt-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "comp-2025-yuvraj-bhatt",
		storageBucket: "comp-2025-yuvraj-bhatt.firebasestorage.app",
		messagingSenderId: "207730944142",
		appId: "1:207730944142:web:cb2ebc6a3ed524b3cfc1df",
		measurementId: "G-7G5X53NW4K"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	// This log prints the firebase object to the console to show that it is working.
	// As soon as you have the script working, delete this log.
	console.log("Firebase initialize finished:");
	console.log(firebase);

	stars = []; // Add this just to be safe to reset the list
	for (let i = 0; i < 100; i++) {
		stars.push({
			x: random(width),
			y: random(height),
			size: random(1, 4)
		});
	}
	//set framerate as 120
	frameRate(120)
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);
	// set world gravity
	world.gravity.y = 4.5;
	// make borders
	wallTop = new Sprite(width / 2, height - height, width, 10, 'k');
	wallTop.color = 'white';

	wallBot = new Sprite(width / 2, height, width, 10, 'k');
	wallBot.color = 'white';
	// create horse
	horse = new Sprite(width / 2 - 25, height - 700, 50, 'd');
	// define horse properties
	horse.bounciness = 0.1;
	horse.speed = 0;
	horse.gravity = 10;
	horse.image = (imgHorsi);

	imgHorsi.resize(50, 50);

	// create a new group for pipes
	pipes = new Group();
	makePipes();


	textSize(32);
	fill(255);
	stroke(0);
	strokeWeight(4);

}

/*******************************************************/
// pipes()
/*******************************************************/
function makePipes() {

	// if the remainder is 0, the spawn the pipes, if not then do nothing.
	if (frameCount % 180 != 0) {
		return;
	}

	let gap = 200; // Distance between pipes
	let minHeight = 50;
	let maxHeight = height - gap - minHeight;
	let topHeight = random(minHeight, maxHeight);

	// Top Pipe
	pipeTop = new Sprite(width + 20, topHeight / 2, 50, topHeight, 'k');
	pipeTop.vel.x = -2; // Move the pipe towards the left
	pipes.add(pipeTop); // adds pipeTop to the group

	// Bottom Pipe
	pipeBottom = new Sprite(width + 20, height - (height - topHeight - gap) / 2, 50, height - topHeight - gap, 'k');
	pipeBottom.vel.x = -2;
	pipes.add(pipeBottom);// adds pipeBottom to the group
	pipes.gravityScale = 0;// pipes gravtity = 0 so they dont fall over

}

let gameState = "play";

function drawMenu() {
	background('orange');
}


function drawGame() {
	// horse controls
	if (kb.pressing('up')) {
		horse.speed = 2.5;
		horse.direction = -90
	};

	background('white')

	if (horse.collides(pipes)) {
		console.log("ouch");
		gameState = "gameover";
		saveGameScore(score); // this is so the game saves the score for me to send to firbase
	}

	text(score, windowWidth / 2 - 40, 150);
	//the score count
	score = frameCount / 120;
	score = Math.floor(score)
	console.log("score: " + score);
	makePipes();

}

function drawGameOver() {
	background('red')
	text("YOU LOST!", windowWidth / 2 - 80, windowHeight / 2);
	text("Refresh tab to restart", windowWidth / 2 - 120, windowHeight / 2 + 50);
	text("your score was " + score, windowWidth / 2 - 90, windowHeight / 2 + 100);
}



function draw() {
	if (gameState === "menu") {

		drawMenu();

	} else if (gameState === "play") {

		drawGame();

	} else if (gameState === "gameover") {

		drawGameOver();

	}

}

function saveGameScore(gameScore) {
	//Get the user currently logged into this session
	var user = firebase.auth().currentUser;

	if (user) {
		var ID = user.uid;
		var gameNumber = 1; // 1 = Flappy Horse

		// Target this specific players slot in the database
		var scoreRef = firebase.database().ref('scores/game_' + gameNumber + '/' + ID);

		// force the gamescore variable to be a number instead of text
		var newScore = Number(gameScore);

		//Read their current record first so it doesnt accidentally overwrite a higher highscore
		scoreRef.once('value').then(function (snapshot) {
			var currentData = snapshot.val();
			var oldHighScore = 0;

			if (currentData && currentData.score !== undefined) { //the && tells js that both conditons must be true to proceed wiith running the code inside the {} brackets
				// force the existing score from firebase to be treated as a number
				oldHighScore = Number(currentData.score);
			}

			console.log("Comparing scores - New: " + newScore + " Old Best: " + oldHighScore);

			//ONLY update Firebase if the new score is higher than users old one
			if (newScore > oldHighScore) {
				console.log("New High Score! Saving " + newScore + " to Firebase.");

				// .update() changes the score and timestamp but leaves their name and age as it is
				scoreRef.update({
					score: newScore,
					timestamp: Date.now()
				}).then(function () {
					console.log("Database update successful!");
				}).catch(function (error) {
					console.error("Database update failed: ", error);
				});
			} else {
				console.log("Score of " + newScore + " didn't beat personal best of " + oldHighScore);
			}
		});

	} else {
		console.log("No user logged in. Play from the main menu to track scores!");
	}
}
/*******************************************************/
//  END OF APP
/*******************************************************/