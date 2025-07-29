//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");


const hamBtn=document.querySelector("#hamIcon");
var allpages=document.querySelectorAll(".page");
const menuItemsList=document.querySelector("ul");

// landmark buttons
const blocks = document.querySelectorAll(".landmark-block");

blocks.forEach(block => {
  const button = block.querySelector(".btn-landmark");
  const info = block.querySelector(".landmark-info");

  // remove show from all info element so it stays hidden
  info.classList.remove("show");

  // add event listener to each button and upon click toggle the show class
  button.addEventListener("click", () => {
    info.classList.toggle("show");
  });
});

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


// for the image gallery
document.querySelectorAll('.grid-item').forEach((container) => {
  const images = container.querySelectorAll('img');
  let currentIndex = 0;

  const showImage = (index) => {
    images.forEach((img, i) => {
    if (i === index) 
      img.style.display = 'block';
    else 
      img.style.display = 'none';
    });
  };

  // make sure there's atleast one image to show
  if (images.length > 0) {
    showImage(currentIndex);
  }

  const btnPrev = container.querySelector('.btn-prev');
  const btnNext = container.querySelector('.btn-next');

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
  }
});


// for form elements
const showFeedbackBtn = document.querySelector("#showFeedback");

showFeedbackBtn.addEventListener("click", function() {
    const name = document.querySelector("#userName").value;
    const landmark = document.querySelector("#landmark").value;
    const rating = document.querySelector("input[name='stars']:checked")?.value;
    const comment = document.querySelector("#userComment").value;
    
    document.querySelector("#result").innerHTML = 
    `<p><b>${name}</b> visited <b>${landmark}</b></p>
     <p>Rating: ${rating}/5</p>
     ${comment ? `<p>Comment: ${comment}</p>` : ""}`;
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
initGame();
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});
hideall();

// minigame
const player = document.querySelector("#player");
const questionElement = document.querySelector("#question");
const livesElement = document.querySelector("#lives");
const messageElement = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");

const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");

// game variables
let playerX = 300;
let playerY = 200;
let lives = 3;
let currentQuestion = 0;
let correctLandmark = "";

// landmark postions
const landmarks = [
    { id: "landmark1", x: 100, y: 50, name: "Statue of Liberty" },
    { id: "landmark2", x: 450, y: 80, name: "Eiffel Tower" },
    { id: "landmark3", x: 200, y: 150, name: "Parthenon" },
    { id: "landmark4", x: 350, y: 300, name: "Neuschwanstein Castle" },
    { id: "landmark5", x: 500, y: 250, name: "Taj Mahal" }
];

const questions = [
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


// initialize the game
function initGame() {
    // set player inital pos to 300x 200y
    playerX = 300;
    playerY = 200;
    updatePlayerPosition();
    
    // reset lives
    lives = 3;
    livesElement.textContent = `Lives: ${lives}`;
    
    // set random question
    currentQuestion = Math.floor(Math.random() * questions.length);
    questionElement.textContent = questions[currentQuestion].question;
    correctLandmark = questions[currentQuestion].answer;
    
    // clear message
    messageElement.textContent = "";
    
    // position landmarks
    landmarks.forEach(landmark => {
        const element = document.querySelector(`#${landmark.id}`);
        element.style.left = `${landmark.x}px`;
        element.style.top = `${landmark.y}px`;
    });
}

// to update player pos on screen
function updatePlayerPosition() {
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
}

// check collision with landmarks
function checkCollision() {

    const playerRect = player.getBoundingClientRect();
    // check each landmark for collision using bounding rectangles
    landmarks.forEach(landmark => {
        const landmarkElement = document.querySelector(`#${landmark.id}`);
        const landmarkRect = landmarkElement.getBoundingClientRect();
        
        // check if player intersects with landmark
        if (!(playerRect.right < landmarkRect.left || playerRect.left > landmarkRect.right || playerRect.bottom < landmarkRect.top || playerRect.top > landmarkRect.bottom)) {
            
          // if landmark is the correct one then show success message
            if (landmark.name === correctLandmark) {
                messageElement.textContent = "Correct! You found the right landmark!";
                // set text color to green, disable all btn and then start new round after 2s
                messageElement.style.color = "green";
                leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = true;
                setTimeout(() => {
                   leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
                   initGame(); 
                }, 2000);
            } 
            // if landmark is not the correct one then reduce lives and show wrong message
            else {
                lives--;
                livesElement.textContent = `Lives: ${lives}`;
                messageElement.textContent = `Wrong! That's the ${landmark.name}. Try again!`;
                messageElement.style.color = "red";
                leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = true;
                // reset player position and enable btns aft 1s
                setTimeout(() => {
                leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
                playerX = 300;
                playerY = 200;
                updatePlayerPosition();
                }, 1000);
                
                // if lives is 0 then show game over message
                if (lives <= 0) {
                    messageElement.textContent = "Game Over! Press Reset to play again.";
                    // disable all the movement buttons
                    leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = true;
                }
            }
        }
    });
}

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

leftBtn.addEventListener("click", () => movePlayer(-20, 0));
rightBtn.addEventListener("click", () => movePlayer(20, 0));
upBtn.addEventListener("click", () => movePlayer(0, -20));
downBtn.addEventListener("click", () => movePlayer(0, 20));
resetBtn.addEventListener("click", () => {
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



