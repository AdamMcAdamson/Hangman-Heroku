var gameOver = false;
var gameStarted = false;
var winCondition = false;

var wordIndex = -1;

var wordGuessAnswer = "DEFAULT_NULL";
var wordGuessDisplay = "DEFAULT_NULL";

var wordDirections = "Press Any Key To Start!";

var wordList = [
["Green Day", "You should know them. Think grass"], 
["Descendents", "Chant! Qwah qwaaaah qwaoh qwah. Pretty good, pretty good"], 
["Ramones", "The 70s were all going 'Hey ho, let's go! hey ho, let's go!'"],
["In Too Deep", "Every kid in the early 2000s sang this song by Math"],
["Rancid", "Their music sounds like their name fits pretty offputting-ly. It sounds had a smell, that'd be it"],
["The Offspring", "The cursed street this band referenced swallowed so many lives"],
["Pretty Fly", "Give it too me Baby! AHH HUH AHH HUH! He definitely is for a white guy"],
["Yellowcard", "Who knew you could get a foul for sleeping all day, staying up all night?"],
["NOFX", "So.. Bob can't drink anymore you say? Well, why doesn't he just shave his head?"],
["Reel Big Fish", "The band is a story of 'Give me all your money for my music' because you can't work in fast food all of your life"],
["Against Me", "Known anarchists who were looking for revolution started a band and were edgy"],
["Teenagers", "This song proves that Chemicals are nuts. They scare the living shit out of me!"],
["Bowling For Soup", "Midlife Crisis central. U2 and Blondie. She is so uncool, acording to these guys"],
["Niki Fm", "'Say Anything' plus the need to watch her breathe while she sleeps. Creepy, but it's the only station that plays song they know"],
["Say Anything","He wrote the song about his grandparents having sex. In WWII. It's moving and about love"],
["Ohio","The Height of this is the highest. She killed him well, alright. Where can you find his heart (it's known for lovers)?"],
["Paramore", "Oh the misery of living on your own. It's fun, ain't it? So they say"],
["Like Torches", "You'll never get this. They tell you how to swing and to look up so they can light the way. You've got Skeletons, btw"],
["Emily", "You go from the best to the worst, all that you've been waiting is for her to laugh and smile? Must be no in the world like her"],
["Hands Down", "I've got a confession to make. His hopes are so high she might kill him with her kiss. She meant it. This must be the best thing he can remember"],
["Dance Gavin Dance", "Sex. If you could own your time, how would you spend it? These guys have some rollercoaster nights"],
["Radio", "Shaking like a WHAT?!?! Poor puppy ate some crazy shit. Too bad Columbus was right, otherwise this Trio would drive off the edge. This song is nuts"],
["Brand New", "To these guys just sex makes the glory fade. Especially if you breathe heavy into the mic. Die young and save yourself... from casual sex"]
];

var usedWordList = [];

var numWins = 0;
var numGuessesRemaining = 12;

var key = null;
var isCorrectGuess = false;

var guessedLetters = [];
var correctGuessedLetters = [];
var incorrectGuessedLetters = [];



var haveTagVariables = false;
var directionsTag, guessTag, guessesRemainingTag, wrongLettersTag, winsTag, gameContainer, gameWindowTag, winSpanTag, loseSpanTag, winWordTag;


for (var i = 0; i < wordGuessDisplay.length; i++) {
	if (wordGuessDisplay[i] != " ") {
		wordGuessDisplay[i] = "_";
	}	
}

// debugLog("[BASE DEBUG]", "all");

document.onkeyup = function(event){
	// console.log(event.keyCode)
	if(event.keyCode > 64 && event.keyCode < 91) {
		key = String.fromCharCode(event.keyCode).toUpperCase();
		if(winCondition === true){
			if(key === "C"){
				startGame();
			}
		} else if(gameOver === true){
			if(key === "R"){
				startGame();
			}
		} else{
			checkForKey(key);
		}
	}
}



function checkForKey(key) {
	if(gameStarted && !gameOver && !winCondition){
		// console.log("checkGuessed: " + checkGuessed(key));
		// console.log("key: " + key);
		if(!checkGuessed(key)){
			for (var i = 0; i < wordGuessAnswer.length; i++) {
				if (key === wordGuessAnswer[i].toUpperCase()) {
					wordGuessDisplay[i] = wordGuessAnswer[i];
					// console.log("Correct! One letter is - " + key.toUpperCase());
					isCorrectGuess = true;	
				} 
			}
			
			guessedLetters.push(key);

			if(isCorrectGuess){
				correctGuessedLetters.push(key);	
				isCorrectGuess = false;
			} else {
				wrongGuess(key);
			}
		}
	} else {
		startGame()
	} 
	checkOver();
	updateDisplay();
}

function startGame() {


	// Defining variables for HTML Tags used for displaying game properties.
	if(!haveTagVariables){
		directionsTag = document.getElementById("game-directions");
		guessTag = document.getElementById("word-guess-display");
		guessesRemainingTag = document.getElementById("num-guesses-remaining");
		wrongLettersTag = document.getElementById("wrong-letters");
		winsTag = document.getElementById("wins-display");
		gameContainer = document.getElementById("game-container");
		gameWindowTag = document.getElementById("game-window");
		winSpanTag = document.getElementById("win-span");
		winWordTag = document.getElementById("win-word");
		loseSpanTag = document.getElementById("lose-span");
		haveTagVariables = true;
	}

	wordDirections = "Press Any Key To Start!";

	if(gameOver === true){
		numWins = 0;
		gameOver = false;
	} else if(winCondition === true){
		winCondition = false;
	} else {
		if(wordList.length === 0){
			wordList = usedWordList.splice(0, usedWordList.length);
		}
		wordIndex = Math.floor(Math.random() * wordList.length);
		wordGuessAnswer = wordList[wordIndex][0].split("");
		wordGuessDisplay = Array.from(wordGuessAnswer);
		wordDirections = wordList[wordIndex][1];

		usedWordList.push(wordList.splice(wordIndex, 1)[0]);

		for (var i = 0; i < wordGuessDisplay.length; i++) {
			if (wordGuessDisplay[i] != " ") {
				wordGuessDisplay[i] = "_";
			}
		}
	
		gameStarted = true;
	
	}
	numGuessesRemaining = 12;
	guessedLetters = [];
	correctGuessedLetters = [];
	incorrectGuessedLetters = [];	

	updateDisplay();

}




function checkOver() {
	// debugLog("CHECK OVER: ", "word");
	if(numGuessesRemaining === 0){
		gameOver = true;
		gameStarted = false;
		return "gameover";
	}
	for(var i = 0; i < wordGuessAnswer.length; i++){
		if(wordGuessAnswer[i] !== wordGuessDisplay[i]){
			// console.log("WINCONDITION FALSE")
			return "nowin";
		}
	}
	numWins++;
	winCondition = true;
	gameStarted = false;
	return "win";
}




function updateDisplay(){
	if(haveTagVariables){
		if(winCondition === true){
			gameContainer.style.visibility = "hidden";
			winSpanTag.style.visibility = "visible";
		}else if(gameOver === true){
			gameContainer.style.visibility = "hidden";
			loseSpanTag.style.visibility = "visible";
		}else if(gameStarted === false){
			gameWindowTag.style.visibility = "hidden";
			gameContainer.style.visibility = "visible";
			winSpanTag.style.visibility = "hidden";
			loseSpanTag.style.visibility = "hidden";
		} else{
			gameWindowTag.style.visibility = "visible";
			gameContainer.style.visibility = "visible";
			winSpanTag.style.visibility = "hidden";
			loseSpanTag.style.visibility = "hidden";
		}
		directionsTag.innerHTML = wordDirections;
		guessTag.innerHTML = wordGuessDisplay.join("");
		guessesRemainingTag.innerHTML = numGuessesRemaining;
		wrongLettersTag.innerHTML = incorrectGuessedLetters.join(", ");
		winsTag.innerHTML = "Wins: " + numWins;
		winWordTag.innerHTML = "You got it! The word was " + wordGuessAnswer.join("") + "!";
		// console.log(wordDirections);
	} else {
		// debugLog("[ERROR] Display Failed: {{updateDisplay() Called Early [From: " + updateDisplay.caller.name + "]}}  \n////// 'haveTagVariables(boolean)' - " + haveTagVariables, "all");
	}
}

// Handles if it the user's letter (key) guessed is wrong
function wrongGuess(key) {

	numGuessesRemaining--;
	incorrectGuessedLetters.push(key);

}

function checkGuessed(key) {
	// console.log("Key Check Guessed");
	if (guessedLetters.includes(key)){
		return true;
	}
	return false;
}

function debugLog(custom, logType) {

	var debugName = "window";

	if(debugLog.caller !== null){
		var debugName = debugLog.caller.name || "onkeyup";
	}
	logType = logType || "main";

	logTypePrint = logType.charAt(0).toUpperCase() + logType.slice(1);

	console.log("\n");
	console.log("FROM: " + debugName + "() -------");
	if(custom != null){
		console.log(custom);

	}

	if(logType !== "none"){
		
		console.log("----------------------");

		if(logType === "word"){

			console.log("Variable Status [" + logTypePrint + "]: -----");
			console.log("wordGuessAnswer: " + wordGuessAnswer);
			console.log("wordGuessDisplay: " + wordGuessDisplay);
			console.log("wordDirections: " + wordDirections);

		} else if(logType === "main" || logType === "state" || logType === "all"){

			console.log("Variable Status [" + logTypePrint + "]: -----");
			console.log("wordGuessAnswer: " + wordGuessAnswer);
			console.log("wordGuessDisplay: " + wordGuessDisplay);
			console.log("wordDirections: " + wordDirections);
			console.log("--");
			console.log("guessedLetters: " + guessedLetters);
			console.log("correctGuessedLetters: " + correctGuessedLetters);
			console.log("incorrectGuessedLetters: " + incorrectGuessedLetters);
			console.log("--");
			console.log("numWins: " + numWins);
			console.log("numGuessesRemaining: " + numGuessesRemaining);

			if(logType === "state" || logType === "all"){

				console.log("--");
				console.log("gameStarted: " + gameStarted);
				console.log("winCondition: " + winCondition);
				console.log("gameOver: " + gameOver);
				
				if(logType === "all"){
					
					console.log("--");
					console.log("wordList: " + wordList);
					console.log("wordIndex: " + wordIndex);
					console.log("--");
					console.log("key: " + key);
					console.log("isCorrectGuess: " + isCorrectGuess);
					console.log("--");
					console.log("haveTagVariables: " + haveTagVariables);
					console.log("directionsTag: " + directionsTag);
					console.log("guessTag: " + guessTag);
					console.log("guessesRemainingTag: " + guessesRemainingTag);
					console.log("wrongLettersTag: " + wrongLettersTag);
					console.log("winsTag: " + winsTag)

				}
			}
		} else {
			console.log("[ERROR] // debugLog Failed: {{Unrecognized logType parameter [From: " + debugName + "]}}");
			console.log("////// 'logType(String)' - " + logType);
		}

	}
	console.log("\n----------------------");
}