// array of questions to be used in the quiz
var questions = [
  { q: 'How many continents are there in the world?', 
    a: 'd. 7', 
    choices: [{choice: 'a. 3'}, {choice: 'b. 5'}, {choice: 'c. 6'}, {choice: 'd. 7'}]
  },
  { q: 'A leap year occurs every __ years', 
    a: 'c. 4', 
    choices: [{choice: 'a. 2'}, {choice: 'b. 3'}, {choice: 'c. 4'}, {choice: 'd. 10'}]
  },
  { q: 'What galaxy do we live in?', 
    a: 'a. milky way', 
    choices: [{choice: 'a. milky way'}, {choice: 'b. andromeda'}, {choice: 'c. virgo a'}, {choice: 'd. silky way'}]
  },
  { q: 'What year did the first ever super bowl happen?', 
    a: 'd. 1967', 
    choices: [{choice: 'a. 1974'}, {choice: 'b. 1958'}, {choice: 'c. 1933'}, {choice: 'd. 1967'}]
  },
  { q: 'In what year did the first iPhone come out?', 
    a: 'a. 2007', 
    choices: [{choice: 'a. 2007'}, {choice: 'b. 2010'}, {choice: 'c. 2005'}, {choice: 'd. 2000'}]
  },
  { q: 'Which ocean is the largest?', 
    a: 'b. Pacific', 
    choices: [{choice: 'a. Atlantic'}, {choice: 'b. Pacific'}, {choice: 'c. Arctic'}, {choice: 'd. Indian'}]
  },
  { q: 'In a website browser address bar, what does “www” stand for?', 
    a: 'b. world wide web', 
    choices: [{choice: 'a. world web wide'}, {choice: 'b. world wide web'}, {choice: 'c. worldy wide webs'}, {choice: 'd. webs wide worldwide'}]
  },
];
//variable declarations for elements we will be pulling from HTML file
var questionContainerDiv = document.getElementById("question-container");
var starterContainerDiv = document.getElementById("starter-container");
var endgameContainerDiv = document.getElementById("end-container");
var scoreBannerDiv = document.getElementById("score-banner");
var initialsFormDiv = document.getElementById("initials-form");
var highScoresArrayContainerDiv = document.getElementById("high-score-container");
var viewhighScoresArrayDiv = document.getElementById("view-high-scores");
var highScoreList = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

//variable declarations for buttons we will use from HTML file
var startBtn = document.querySelector("#start-game");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-high-scores");

//vars for questions and answers
var questionEl = document.getElementById("question");
var ansBtns = document.getElementById("answer-buttons");
var timerEl = document.querySelector("#timer");
var score = 0;
var timeGiven;
var gameOver;
timerEl.innerText = 0;

//High Score Array and code that will be used alongside array
var highScoresArray = [];
var shuffleQuestions;
var questionIndex = 0;

  //function for when the go back button is hit on high score page
function goBack() {
  highScoresArrayContainerDiv.classList.add("hide")
  highScoresArrayContainerDiv.classList.remove("show")
  starterContainerDiv.classList.remove("hide")
  starterContainerDiv.classList.add("show")
  scoreBannerDiv.removeChild(scoreBannerDiv.lastChild)
  questionIndex = 0
  gameOver = ""
  timerEl.textContent = 0 
  score = 0
    if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
    }
    if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
    }
}

//function to set a timer for 45 seconds
function startTimer() {
  timeGiven = 45;

var timer = setInterval(function() {
  timerEl.innerText = timeGiven;
  timeGiven--;

  if (gameOver) {
      clearInterval(timer);
  }
 
  if (timeGiven < 0) {
      finalScore();
      timerEl.innerText = 0;
      clearInterval(timer);
  }

  }, 1000)
}
//code for game logic begins here
  //function to start the quiz game
function startGame() {
  //add classes to show/hide start and quiz screen
  starterContainerDiv.classList.add('hide');
  starterContainerDiv.classList.remove('show');
  questionContainerDiv.classList.remove('hide');
  questionContainerDiv.classList.add('show');
  //Shuffle the questions so they show in random order
  shuffleQuestions = questions.sort(() => Math.floor(Math.random()) - 0.5);
  startTimer();
  nextQuestion();
}

//function to set the next question
function nextQuestion() {
  resetAnswers();
  displayQuestion(shuffleQuestions[questionIndex]);
}

//function to remove answer buttons
function resetAnswers() {
  while (ansBtns.firstChild) {
      ansBtns.removeChild(ansBtns.firstChild)
  };
};

//function to display question with 4 possible answers
function displayQuestion(index) {
  questionEl.innerText = index.q;
  for (var i = 0; i < index.choices.length; i++) {
      var answerbutton = document.createElement('button');
      answerbutton.innerText = index.choices[i].choice;
      answerbutton.classList.add('btn');
      answerbutton.classList.add('answerbtn');
      answerbutton.addEventListener("click", checkAnswer);
      ansBtns.appendChild(answerbutton);
      }
  };
//function that tells user the answer chosen is correct
function answerIsCorrect() {
  if (correctEl.className = "hide") {
      correctEl.classList.remove("hide");
      correctEl.classList.add("banner");
      wrongEl.classList.remove("banner");
      wrongEl.classList.add("hide");
      }
  }  
//function that tells user answer chosen is wrong
function answerIsWrong() {
  if (wrongEl.className = "hide") {
      wrongEl.classList.remove("hide");
      wrongEl.classList.add("banner");
      correctEl.classList.remove("banner");
      correctEl.classList.add("hide");
  }
}

//function that determines if player will increase score or be penalized, then app will check if there are more  questions.
function checkAnswer(event) {
  var selectedAns = event.target
      if (shuffleQuestions[questionIndex].a === selectedAns.innerText){
          answerIsCorrect();
          score = score + 10;
      }

      else {
        answerIsWrong()
        score = score - 5;
        timeGiven = timeGiven - 3;
    };

    questionIndex++
      if  (shuffleQuestions.length > questionIndex + 1) {
          nextQuestion()
      }   
      else {
         gameOver = "true";
         finalScore();
          }
}

//scoring code section begins here
  //function to show total score on the screen at the end of the game
function finalScore() {
  questionContainerDiv.classList.add("hide");
  endgameContainerDiv.classList.remove("hide");
  endgameContainerDiv.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  scoreBannerDiv.appendChild(scoreDisplay);
}       

//function to create high score values
function createHighScore(event) { 
  event.preventDefault() 
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

initialsFormDiv.reset();

var HighScore = {
initials: initials,
score: score
} 

//method to push and sort scores
highScoresArray.push(HighScore);
highScoresArray.sort((a, b) => {return b.score-a.score});

//loop to clear visible list of scores
while (highScoreList.firstChild) {
 highScoreList.removeChild(highScoreList.firstChild)
}
//create elements in order of high scores
for (var i = 0; i < highScoresArray.length; i++) {
var highScoreEl = document.createElement("li");
highScoreEl.ClassName = "high-score";
highScoreEl.innerHTML = highScoresArray[i].initials + " - " + highScoresArray[i].score;
highScoreList.appendChild(highScoreEl);
}
saveHighScore();
showHighScore();
}
//function to save player high score
function saveHighScore() {
  localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray))  
}

//function to load player high scores
function loadHighScore() {
  var loadPlayerScores = localStorage.getItem("highScoresArray");
      if (!loadPlayerScores) {
      return false;
  }
  loadPlayerScores = JSON.parse(loadPlayerScores);
  loadPlayerScores.sort((a, b) => {return b.score-a.score})
    for (var i = 0; i < loadPlayerScores.length; i++) {
      var highScoreEl = document.createElement("li");
      highScoreEl.ClassName = "high-score";
      highScoreEl.innerText = loadPlayerScores[i].initials + " - " + loadPlayerScores[i].score;
      highScoreList.appendChild(highScoreEl);

      highScoresArray.push(loadPlayerScores[i]);
  }
}  

//function to show high score screen from link or after initials are entered
function showHighScore() {

  highScoresArrayContainerDiv.classList.remove("hide");
  highScoresArrayContainerDiv.classList.add("show");
  gameOver = "true";
    if (endgameContainerDiv.className = "show") {
      endgameContainerDiv.classList.remove("show");
      endgameContainerDiv.classList.add("hide");
      }
    if (starterContainerDiv.className = "show") {
      starterContainerDiv.classList.remove("show");
      starterContainerDiv.classList.add("hide");
      }
    if (questionContainerDiv.className = "show") {
      questionContainerDiv.classList.remove("show");
      questionContainerDiv.classList.add("hide");
      }
    if (correctEl.className = "show") {
      correctEl.classList.remove("show");
      correctEl.classList.add("hide");
      }
    if (wrongEl.className = "show") {
      wrongEl.classList.remove("show");
      wrongEl.classList.add("hide");
      }
}
//function to clear high scores
function clearScores() {
  highScoresArray = [];
    while (highScoreList.firstChild) {
      highScoreList.removeChild(highScoreList.firstChild);
  }
  localStorage.clear(highScoresArray);
} 
loadHighScore()
  
//event listeners for buttons that are clicked
startBtn.addEventListener("click", startGame);
initialsFormDiv.addEventListener("submit", createHighScore);
viewhighScoresArrayDiv.addEventListener("click", showHighScore);
goBackBtn.addEventListener("click", goBack);
clearScoresBtn.addEventListener("click", clearScores);