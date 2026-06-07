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
	
for (let i = 0; i < 10; i++) {
	// for loop that does absolutley nothing and glitches while making the background grey.
    if ((i + frameCount) % 2 == 0) {
        fill(255); // White
    } else {
        fill(0);   // Black
    }
    
    noStroke();
    // Draw a rectangle for each part of the loop
    rect(i * (width / 10), 0, width / 10, height);
}
	if (horse.collides(pipes)) {
		console.log("ouch");
		gameState = "gameover";
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
	text("your score was " +score, windowWidth / 2 - 90, windowHeight / 2 + 100);
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
/*******************************************************/
//  END OF APP
/*******************************************************/