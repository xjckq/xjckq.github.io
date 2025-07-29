//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");


const hamBtn=document.querySelector("#hamIcon");
var allpages=document.querySelectorAll(".page");
const menuItemsList=document.querySelector("ul");

// fullscreen and exit full screen buttons
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");

btnFS.addEventListener("click",enterFullscreen);
btnWS.addEventListener("click",exitFullscreen);
function enterFullscreen() { //must be called by user generated event
document.documentElement.requestFullscreen();
}
function exitFullscreen() {
document.exitFullscreen();
}

// landmark buttons
var landmarkBlocks = document.querySelectorAll(".landmark-block");

for (var i = 0; i < landmarkBlocks.length; i++) {
  var button = landmarkBlocks[i].querySelector(".btn-landmark");
  
  // hide info initially
  var info = landmarkBlocks[i].querySelector(".landmark-info");
  info.classList.remove("show");

  // on click, find the landmark info inside the parent container then show the text
  button.addEventListener("click", function() {
    var infoText= this.parentNode.querySelector(".landmark-info");
    infoText.classList.toggle("show");
  });
}



// for transition
var blocks = document.querySelectorAll('.block');

// create intersection observer to see when elements enter the viewport
var showOnScroll = new IntersectionObserver(function (entries) {
  // loop through all the entries and if the element is visble then set it visible
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting) 
      entries[i].target.classList.add('visible');
  }
});

// observe for each block element 
for (var i = 0; i < blocks.length; i++) {
  showOnScroll.observe(blocks[i]);
}



// for the image gallery
var gridItems = document.querySelectorAll('.grid-item');

// setup each grid item as a gallery
for (var i = 0; i < gridItems.length; i++) {
  var container = gridItems[i];
  setupGallery(container);
}

// setup gallery for each grid item
function setupGallery(container) {
  var images = container.querySelectorAll('img');
  var currentIndex = 0;

  // show image base on the index and then hide the rest
  function showImage(index) {
    for (var j = 0; j < images.length; j++) {
      if (j === index) 
        images[j].style.display = 'block';
      else 
        images[j].style.display = 'none';   
    }
  }

  // show the first image if there are images
  if (images.length > 0) {
    showImage(currentIndex);
  }

  // find previous and next buttons in the container
  var btnPrev = container.querySelector('.btn-prev');
  var btnNext = container.querySelector('.btn-next');

  // if there are previous and next buttons then add event listeners
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      // decrease index to go to previous image and loop to the last if its the first image
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      // increase index to go to next image and loop to the first if its the last image
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
  }
}

// for form elements
var showFeedbackBtn = document.querySelector("#showFeedback");

showFeedbackBtn.addEventListener("click", function () {
  
  var name = document.querySelector("#userName").value;
  var landmark = document.querySelector("#landmark").value;
  var ratingInput = document.querySelector("input[name='stars']:checked");
  var rating = ratingInput ? ratingInput.value : "No rating";
  var comment = document.querySelector("#userComment").value;

  var html = "<p><b>" + name + "</b> visited <b>" + landmark + "</b></p>" + "<p>Rating: " + rating + "/5</p>";

  if (comment) 
   html += "<p>Comment: " + comment + "</p>";

  document.querySelector("#result").innerHTML = html;
});

//select all subtopic pages
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages 
onepage.style.display="none"; //hide it
}
}

function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page

}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});
hideall();

// minigame

var startBtn = document.querySelector("#startBtn");
var mazeArea = document.querySelector("#maze-area");
var  controls = document.querySelector("#controls");

var player = document.querySelector("#player");
var questionElement = document.querySelector("#question");
var livesElement = document.querySelector("#lives");
var messageElement = document.querySelector("#message");
var resetBtn = document.querySelector("#resetBtn");

var leftBtn = document.querySelector("#leftBtn");
var rightBtn = document.querySelector("#rightBtn");
var upBtn = document.querySelector("#upBtn");
var downBtn = document.querySelector("#downBtn");

// game variables
var playerX = 300;
var playerY = 200;
var lives = 3;
var currentQuestion = 0;
var correctLandmark = "";

// hide game, text and controls initially
mazeArea.style.display = "none";
controls.style.display = "none";
questionElement.style.display = "none";
livesElement.style.display = "none";

// landmark postions
var landmarks = [
    { id: "landmark1", x: 100, y: 50, name: "Statue of Liberty" },
    { id: "landmark2", x: 450, y: 80, name: "Eiffel Tower" },
    { id: "landmark3", x: 200, y: 150, name: "Parthenon" },
    { id: "landmark4", x: 350, y: 300, name: "Neuschwanstein Castle" },
    { id: "landmark5", x: 500, y: 250, name: "Taj Mahal" }
];

var questions = [
    {
        question: "Which landmark is a gift from France to the United States?",
        answer: "Statue of Liberty"
    },
    {
        question: "Which landmark was built for the 1889 World's Fair?",
        answer: "Eiffel Tower"
    },
    {
        question: "Which landmark is an ancient temple in Greece?",
        answer: "Parthenon"
    },
    {
        question: "Which landmark inspired Disney's Sleeping Beauty Castle?",
        answer: "Neuschwanstein Castle"
    },
    {
        question: "Which landmark is a white marble mausoleum in India?",
        answer: "Taj Mahal"
    }
];

startBtn.addEventListener("click", initGame);

// initialize the game
function initGame() {

      mazeArea.style.display = "block";   // show maze
      controls.style.display = "block";   // show movement btn
      questionElement.style.display = "block"; // show qns
      livesElement.style.display = "block";  // show lives
      startBtn.style.display = "none";    // hide start btn

    // set player inital pos to 300x 200y
    playerX = 300;
    playerY = 200;
    updatePlayerPosition();
    
    // reset lives
    lives = 3;
    livesElement.textContent = "Lives: " + lives;
    
    // set random question
    currentQuestion = Math.floor(Math.random() * questions.length);
    questionElement.textContent = questions[currentQuestion].question;
    correctLandmark = questions[currentQuestion].answer;
    
    // clear message
    messageElement.textContent = "";
    
    // position landmarks
    for (var i = 0; i < landmarks.length; i++) {
      var landmark = landmarks[i];
      var element = document.querySelector("#" + landmark.id);
      element.style.left = landmark.x + "px";
      element.style.top = landmark.y + "px";
    }
}

// to update player pos on screen
function updatePlayerPosition() {
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

// check collision with landmarks
function checkCollision() {

  var playerRect = player.getBoundingClientRect();

  // check each landmark for collision using bounding rectangles
  for (var i = 0; i < landmarks.length; i++) {
    var landmark = landmarks[i];
    var landmarkElement = document.querySelector("#" + landmark.id);
    var landmarkRect = landmarkElement.getBoundingClientRect();

    // check if player intersects with landmark 
    var isIntersecting = !(playerRect.right < landmarkRect.left || playerRect.left > landmarkRect.right ||playerRect.bottom < landmarkRect.top || playerRect.top > landmarkRect.bottom);
    // if player intersects with landmark then check if is the correct landmark
    if (isIntersecting) {
      // if correct then set text color to green, disable all btn and  start new round after 2s
      if (landmark.name === correctLandmark) {
        messageElement.textContent = "Correct! You found the right landmark!";
        messageElement.style.color = "green";
        disableMovement();
        setTimeout(correctAnsTimeout, 2000);

      } 
      else {
        // if landmark is not the correct then minus lives and show wrong message
        lives--;
        livesElement.textContent = "Lives: " + lives;
        messageElement.textContent = "Wrong! That's the " + landmark.name + ". Try again!";
        messageElement.style.color = "red";
        disableMovement();

        // reset player position and enable btns aft 1s
        setTimeout(wrongAnsTimeout, 1000);

        // if lives is 0 then show game over message
        if (lives <= 0) {
          messageElement.textContent = "Game Over! Press Reset to play again.";
          disableMovement();
        }
      }
    }
  }
}

// ==== player movements ====

// move player based on btn click
function movePlayer(dx, dy) {
    // if player is outside boundary then return/dont move
    if (playerX + dx < 0 || playerX + dx > 560 || playerY + dy < 0 || playerY + dy > 360) {
        return; 
    }
    
    // update player position
    playerX += dx;
    playerY += dy;
    updatePlayerPosition();
    checkCollision();
}

function moveLeft() {
  movePlayer(-20, 0);
}
function moveRight() {
  movePlayer(20, 0);
}
function moveUp() {
  movePlayer(0, -20);
}
function moveDown() {
  movePlayer(0, 20);
}

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);
upBtn.addEventListener("click", moveUp);
downBtn.addEventListener("click", moveDown);

// to enable/disable btn for movement
function disableMovement() {
  leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = true;
}

function enableMovement() {
  leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
}

function correctAnsTimeout() {
  enableMovement();
  initGame();
}

function wrongAnsTimeout() {
  enableMovement();
  playerX = 300;
  playerY = 200;
  updatePlayerPosition();
}


resetBtn.addEventListener("click", function () {
  // enable all btn again and initialize the game
  leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
  initGame();
});

function toggleMenus(){ /*open and close menu*/
//if menuItemsList dont have the class "menuShow", add it, else remove it
menuItemsList.classList.toggle("menuShow");
//if menu is showing (has the class “menuShow”)
if(menuItemsList.classList.contains("menuShow")){
hamBtn.innerHTML="Close Menu"; //change button text to chose menu
}else{ //if menu NOT showing
hamBtn.innerHTML="Open Menu"; //change button text open menu
}
}
hamBtn.addEventListener("click", toggleMenus);



