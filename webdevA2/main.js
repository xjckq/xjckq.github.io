//target all elements to save to constants

// ==== nav button to switch between pages ====
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");

// ==== hamburger menu for mobile ====
const hamBtn = document.querySelector("#hamIcon");
var allpages = document.querySelectorAll(".page");
const menuItemsList = document.querySelector("ul");

// ==== fullscreen btn ====
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");

// ==== elements for landmark cultural section ====
const thumbnails = document.querySelectorAll('.landmark-thumbnail');
const descriptions = document.querySelectorAll('.desc-box');
const scrollContainer = document.getElementById('landmarkScroll');
const scrollUpBtn = document.querySelector('.up-btn');
const scrollDownBtn = document.querySelector('.down-btn');

// ==== element for scroll animation ====
const blocks = document.querySelectorAll('.block');
const landmarkBlocks = document.querySelectorAll(".landmark-block");

// ==== grid gallery for architectural style ====
const gridItems = document.querySelectorAll('.grid-item');

// ==== form element ====
const showFeedbackBtn = document.querySelector("#showFeedback");

// ==== gallery for continents ====
const gallery = document.getElementById("landmark-gallery");
const maps = document.querySelectorAll(".continent-map");

// ==== minigame elements ====
const startBtn = document.querySelector("#startBtn");
const mazeArea = document.querySelector("#maze-area");
const controls = document.querySelector("#controls");
const player = document.querySelector("#player");
const questionElement = document.querySelector("#question");
const livesElement = document.querySelector("#lives");
const messageElement = document.querySelector("#message");
const resetBtn = document.querySelector("#resetBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const gameIntro = document.querySelector("#game-intro");

// ==== quiz elements ====
const quizIntroTxt = document.querySelector("#quiz-intro");
const startQuizBtn = document.querySelector("#startQuizBtn");
const quizContent = document.querySelector("#quiz-content");
const quizQuestion = document.querySelector("#quiz-question");
const quizButtons = document.querySelector(".quiz-buttons");
const quizNextBtn = document.querySelector("#quizNextBtn");
const quizSubmitBtn = document.querySelector("#quizSubmitBtn");
const quizScoreDisplay = document.querySelector("#quiz-score-display");
const quizRestartBtn = document.querySelector("#quizRestartBtn");

// ==== audio ====
const winAudio = new Audio("audio/succeed.mp3");
const loseAudio = new Audio("audio/failed.mp3");
const rightAnsAudio = new Audio("audio/rightanswer.mp3");
const wrongAnsAudio = new Audio("audio/wronganswer.mp3");
const movingAudio = new Audio("audio/move.mp3");

// ======= NAVBAR =======
//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages 
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    resetAllElements();
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
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

// ======= MENU TOGGLE =======
function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class "menuShow")
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        hamBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}
hamBtn.addEventListener("click", toggleMenus);

// ======== FULL SCREEN BTN ========
btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

function enterFullscreen() { //must be called by user generated event
    document.documentElement.requestFullscreen();
}

function exitFullscreen() {
    document.exitFullscreen();
}

// ======== LANDMARK INFO TOGGLE (page1) =======
// == show info on click ==
for (let i = 0; i < landmarkBlocks.length; i++) { // loop through all the blocks 
    const button = landmarkBlocks[i].querySelector(".btn-landmark"); // find button
    const info = landmarkBlocks[i].querySelector(".landmark-info"); // find info txt

    // hide info first
    info.classList.remove("show");

    // when btn is clicked, go to the parent block and find landmark-info then show/hide the info
    button.addEventListener("click", function () {
        const infoText = this.parentNode.querySelector(".landmark-info");
        infoText.classList.toggle("show");
    });
}

// ======= BLOCK SCROLL ANIMATION (page1) =======
// creates an observer that watches when elements become visible
const showOnScroll = new IntersectionObserver(function (entries) {
    // loop through all the entries to check if the element became visible
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting)
            entries[i].target.classList.add('visible');
    }
});

// observe for each block element
for (let i = 0; i < blocks.length; i++) {
    showOnScroll.observe(blocks[i]);
}

// ======= GRID GALLERY (page2) =======
// setup each grid item as a gallery
for (let i = 0; i < gridItems.length; i++) {
    const container = gridItems[i];
    setupGallery(container);
}

// setup gallery for each grid item
function setupGallery(container) {
    const images = container.querySelectorAll('img'); // find all img
    let currentIndex = 0; // start with first img

    // function to show only one img base on the index number and then hide the rest
    function showImage(index) {
        for (let j = 0; j < images.length; j++) {
            if (j === index)
                images[j].style.display = 'block';
            else
                images[j].style.display = 'none';
        }
    }

    // show the first image if there are any img
    if (images.length > 0) {
        showImage(currentIndex);
    }

    // find prev and next btn in the container
    const btnPrev = container.querySelector('.btn-prev');
    const btnNext = container.querySelector('.btn-next');

    // if there are prev and next btn then add event listeners
    if (btnPrev) {
        btnPrev.addEventListener('click', function () {
            // decrease index to go to prev img and loop to the last if its the first image
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }

    if (btnNext) {
        btnNext.addEventListener('click', function () {
            // increase index to go to next img and loop to the first if its the last image
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }
}

// ======= LANDMARK BY CONTINENT GALLERY (page3) =======
// list of landmark img for each continent
const continentLandmarks = {
    northAmerica: [
        "images/statueofliberty.jpg",
        "images/mountrushmore.jpg",
        "images/goldengatebridge.jpg",
        "images/grandcanyon.jpg",
        "images/niagarafalls.jpg"
    ],
    southAmerica: [
        "images/machupicchu.jpg",
        "images/iguazufalls.jpg",
        "images/angelfalls.jpg",
        "images/christtheredeemer.jpg",
        "images/easterisland.jpg",
    ],
    europe: [
        "images/eiffeltower.jpg",
        "images/colosseum.jpg",
        "images/bigben.jpg",
        "images/parthenon.jpg",
        "images/leaningtower.jpg",
    ],
    asia: [
        "images/wallofchina.jpg",
        "images/tajmahal.jpg",
        "images/angkorwat.jpg",
        "images/mtfuji.jpg",
        "images/borobudurtemple.jpg"
    ],
    africa: [
        "images/pyramids.jpg",
        "images/tablemountain.jpg",
        "images/victoriafalls.jpg",
        "images/kilimanjaro.jpg",
        "images/serengeti.jpg"
    ],
    australia: [
        "images/sydneyoperahouse.jpg",
        "images/uluru.jpg",
        "images/harbourbridge.jpg",
        "images/bluemountains.jpg",
        "images/milfordsound.jpg"
    ]
};

let currentContinent = null; // to keep track of which continent is currently showing

// add event listyener to each continent
for (let i = 0; i < maps.length; i++) {
    maps[i].addEventListener("click", onContinentClick);
}

function onContinentClick() {
    const continent = this.id; // get id of the continent that is clicked

    if (continent === currentContinent && gallery.style.display === "flex") { // if clicked on the same continent agn then hide it
        gallery.style.display = "none"; // hide
        gallery.innerHTML = ""; // clear prev content
        currentContinent = null;
        return;
    }

    // to show landmarks for the clicked continent
    currentContinent = continent;
    const images = continentLandmarks[continent]; //get images for the clicked continent
    gallery.innerHTML = ""; // clear prev content

    for (let j = 0; j < images.length; j++) { // loop through to create and add img to the gallery
        const div = document.createElement("div");
        div.className = "flex-item";

        const img = document.createElement("img");
        img.src = images[j];
        img.alt = "Landmark";

        div.appendChild(img); // put img in the div container
        gallery.appendChild(div); // put div container in gallery
    }

    gallery.style.display = "flex"; // show gallery
}

// ======= MINIGAME (page3) =======
// game variables
let playerX = 100;
let playerY = 250;
let lives = 3;
let currentQuestion = 0;
let correctLandmark = "";
let qnsAnswered = 0;
let correctAns = 0;
const totalQns = 5;

// hide game, text and controls initially
mazeArea.style.display = "none";
controls.style.display = "none";
questionElement.style.display = "none";
livesElement.style.display = "none";

// landmark postions
const landmarks = [
    { id: "landmark1", x: 5, y: 50, name: "Eiffel Tower" },
    { id: "landmark2", x: 310, y: 20, name: "Angkor Wat" },
    { id: "landmark3", x: 250, y: 150, name: "Machu Picchu" },
    { id: "landmark4", x: 150, y: 300, name: "Great Wall of China" },
    { id: "landmark5", x: 350, y: 250, name: "Taj Mahal" }
];

const questions = [
    {
        question: "Which landmark was originally constructed as the entrance arch for the 1889 Exposition Universelle (World's Fair) to celebrate the 100th anniversary of the French Revolution?",
        answer: "Eiffel Tower"
    },
    {
        question: "Which landmark was built during the early 12th century (1113-1150 CE) by King Suryavarman VII as a Hindu temple dedicated to the god Vishnu?",
        answer: "Angkor Wat"
    },
    {
        question: "Which landmark was commissioned by Mughal Emperor Shah Jahan as a mausoleum for his beloved wife, Mumtaz Mahal, who died giving birth in 1631?",
        answer: "Taj Mahal"
    },
    {
        question: "Which landmark was built during the reign of Inca emperor Pachacuti (1438-1472) as an imperial estate and agricultural center, but was abandoned around 1572 during the Spanish conquest?",
        answer: "Machu Picchu"
    },
    {
        question: "Which landmark's construction began as early as the 7th century BC during the Warring States period to protect Chinese states against nomadic invasions?",
        answer: "Great Wall of China"
    }
];

// initialize game when start btn is clicked
startBtn.addEventListener("click", initGame);

// initialize the game
function initGame() {
    mazeArea.style.display = "block"; // show maze
    controls.style.display = "block"; // show movement btn
    questionElement.style.display = "block"; // show qns
    livesElement.style.display = "block"; // show lives
    startBtn.style.display = "none"; // hide start btn
    gameIntro.style.display = "none"; // hide intro txt

    // set player inital pos to 100x 250y
    playerX = 100;
    playerY = 250;
    updatePlayerPosition();

    // reset varaibles
    lives = 3;
    livesElement.textContent = "Lives: " + lives;
    qnsAnswered = 0;
    correctAns = 0;

    // initialize qns
    currentQuestion = 0;
    questionElement.textContent = questions[currentQuestion].question;
    correctLandmark = questions[currentQuestion].answer;

    // clear prev message
    messageElement.textContent = "";

    // position landmarks on the screen
    for (let i = 0; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        const element = document.querySelector("#" + landmark.id);
        element.style.left = landmark.x + "px";
        element.style.top = landmark.y + "px";
    }
}

// to update player pos on screen
function updatePlayerPosition() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}

// change text when player win and only show reset button
function winGame() {
    messageElement.textContent = "Congratulations, you've answered all questions correctly!";
    messageElement.style.color = "green";
    winAudio.play();
    disableMovement();
    controls.style.display = "none";
    resetBtn.style.display = "block";
}

// check collision with landmarks
function checkCollision() {
    const playerRect = player.getBoundingClientRect(); // get player pos and size

    // check each landmark for collision with rectangle
    for (let i = 0; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        const landmarkElement = document.querySelector("#" + landmark.id);
        const landmarkRect = landmarkElement.getBoundingClientRect();

        // check if player and landmark are overlapping
        const isOverlapping = !(playerRect.right < landmarkRect.left || playerRect.left > landmarkRect.right || playerRect.bottom < landmarkRect.top || playerRect.top > landmarkRect.bottom);
        // if player is overlappign with landmark then check if is the correct landmark
        if (isOverlapping) {
            // if correct, increase correct ans count then set text color to green, disable all btn and  start new round after 2s
            if (landmark.name === correctLandmark) {
                correctAns++;
                messageElement.textContent = "Correct! You found the right landmark!";
                messageElement.style.color = "green";
                rightAnsAudio.play();
                disableMovement();
                setTimeout(correctAnsTimeout, 2000);
            } else {
                // if landmark is not the correct then minus lives and show wrong message
                lives--;
                livesElement.textContent = "Lives: " + lives;
                messageElement.textContent = "Wrong! That's the " + landmark.name + ". Try again!";
                messageElement.style.color = "red";
                wrongAnsAudio.play();
                disableMovement();

                // if lives is 0 then show game over message else reset player position and enable btns aft 1s
                if (lives <= 0) {
                    messageElement.textContent = "Game Over! Press Reset to play again.";
                    loseAudio.play();
                    disableMovement();
                    resetBtn.style.display = "block";
                } else
                    setTimeout(wrongAnsTimeout, 1000);
            }
        }
    }
}

// ==== player movements ====

// move player based on btn click
function movePlayer(dx, dy) {
    // get maze and player dimensions
    const mazeRect = mazeArea.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // get maxX and maxY base on the size of the maze and player
    const maxX = mazeRect.width - playerRect.width;
    const maxY = mazeRect.height - playerRect.height;

    // check if player is going over the left/right/top/btm edge and dont move if player is 
    if (playerX + dx < 0 || playerX + dx > maxX || playerY + dy < 0 || playerY + dy > maxY) //
        return;

    // update player position and check for collision
    playerX += dx;
    playerY += dy;
    movingAudio.play();
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

// functions to enable/disable btn for movement
function disableMovement() {
    leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = true;
}

function enableMovement() {
    leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
}

// functions to allow a short delay then start a new round and enable movement afterwards
function correctAnsTimeout() {
    // move to next question
    currentQuestion++;

    // if answered all 5 correctly then win the game
    if (correctAns >= totalQns)
        winGame();
    // else if player correct answer is lesser than that and there more qns then show next one and reset player pos
    else if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        correctLandmark = questions[currentQuestion].answer;
        playerX = 100;
        playerY = 250;
        updatePlayerPosition();
        enableMovement();
        messageElement.textContent = "";
    }
    // if there's no more qns then game over
    else {
        messageElement.textContent = "Game Over! You answered all questions but didn't get enough correct. Press Reset to play again.";
        loseAudio.play();
        disableMovement();
        resetBtn.style.display = "block";
    }
}

function wrongAnsTimeout() {
    playerX = 100;
    playerY = 250;
    updatePlayerPosition();
    enableMovement();
}

resetBtn.addEventListener("click", function () {
    // enable all btn again and initialize the game
    leftBtn.disabled = rightBtn.disabled = upBtn.disabled = downBtn.disabled = false;
    resetBtn.style.display = "none";
    initGame();
});

// ======= SCROLL UP/DOWN BTN (page4) =======
// scroll up and down on button click

const scrollAmt = 250;

// scroll up
scrollUpBtn.addEventListener('click', function () {
    scrollContainer.scrollTop -= scrollAmt;
});

// scroll down
scrollDownBtn.addEventListener('click', function () {
    scrollContainer.scrollTop += scrollAmt;
});

// ======= CHANGE DESC ON THUMBNAIL CLICK (page4) =======
// update text on img click
function onThumbnailClick() {
    const targetId = this.getAttribute('data-id'); // get data-id attribute from clicked thumbnail

    // hide all descriptions first
    for (let j = 0; j < descriptions.length; j++) {
        descriptions[j].style.display = 'none';
    }

    // show description if matches the thjumbnail
    const targetDesc = document.querySelector('#' + targetId);
    if (targetDesc)
        targetDesc.style.display = 'block';
}

// add event listeners for all thumbnails
for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', onThumbnailClick);
}

// ======= CULTURAL SIGNIFICANCE QUIZ (page4) =======
const quizQuestions = [
    {
        question: "Which landmark was built as a symbol of love by Emperor Shah Jahan?",
        options: ["Taj Mahal", "Red Fort", "Lotus Temple", "Gateway of India"],
        correct: 0
    },
    {
        question: "The Statue of Liberty was a gift from which country?",
        options: ["England", "Spain", "France", "Italy"],
        correct: 2
    },
    {
        question: "Which ancient wonder is the only one still standing today?",
        options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Pyramid of Giza", "Hanging Gardens"],
        correct: 2
    },
    {
        question: "Machu Picchu was built by which ancient civilization?",
        options: ["Aztec", "Inca", "Maya", "Olmec"],
        correct: 1
    },
    {
        question: "The Great Wall of China was primarily built to protect against invasions from which direction?",
        options: ["South", "East", "West", "North"],
        correct: 3
    }
];

// quiz variables
let currentQuestionIndex = 0;
let playerAnswers = [];
let quizScore = 0;

// event listeners
startQuizBtn.addEventListener("click", initQuiz);
quizNextBtn.addEventListener("click", nextQuestion);
quizSubmitBtn.addEventListener("click", submitQuiz);
quizRestartBtn.addEventListener("click", restartQuiz);

// using event delegation for radio button clicks
quizContent.addEventListener("click", updateQuizBtn);

function initQuiz() {
    // hide start button and quiz intro and show quiz elements
    startQuizBtn.style.display = "none";
    quizIntroTxt.style.display = "none";
    quizContent.style.display = "block";
    quizQuestion.style.display = "block";
    quizButtons.style.display = "block";
    resetBtn.style.display = "none";

    // reset all variables
    currentQuestionIndex = 0;
    playerAnswers = [];
    quizScore = 0;

    displayQuestion();
}

function displayQuestion() {
    // clear prev selection
    const radioButtons = quizContent.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }

    // update question text
    quizQuestion.innerHTML = "<h4>Question " + (currentQuestionIndex + 1) + " of " + quizQuestions.length + "</h4>" + "<p>" + quizQuestions[currentQuestionIndex].question + "</p>";

    // update option labels with current question's options
    const optionLabels = quizContent.querySelectorAll('label');
    for (let i = 0; i < optionLabels.length && i < quizQuestions[currentQuestionIndex].options.length; i++) { // loop through each label option
        const radioButton = optionLabels[i].querySelector('input[type="radio"]'); // find and save the radio btn before clearing
        optionLabels[i].innerHTML = ''; // clear the content for the label
        optionLabels[i].appendChild(radioButton); // put radio btn back into the label
        optionLabels[i].appendChild(document.createTextNode(' ' + quizQuestions[currentQuestionIndex].options[i])); // add new option txt beside the radio button
    }

    quizNextBtn.disabled = true; // disable until an answer is selected
    quizSubmitBtn.disabled = true;
    // show the next btn if it's not the last qns and show the submit btn if it's the last qns
    if (currentQuestionIndex === quizQuestions.length - 1) {
        quizNextBtn.style.display = "none";
        quizSubmitBtn.style.display = "block";
    } else {
        quizNextBtn.style.display = "block";
        quizSubmitBtn.style.display = "none";
    }
}

function updateQuizBtn(event) {
    if (event.target.type === "radio") { // checks if the element clicked is a radio button 
        if (currentQuestionIndex === quizQuestions.length - 1) // enable the next btn if it's not the last qns and disable the submit btn if it's the last qns
            quizSubmitBtn.disabled = false;
        else
            quizNextBtn.disabled = false;
    }
}

function nextQuestion() {
    // get selected answer for the current qns
    const selectedAnswer = document.querySelector("input[name='quiz']:checked");
    // if answer is not selected then show alert to prevent player from skipping the qns
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    // stores the player answer for the qns
    playerAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);

    // move on to next question
    currentQuestionIndex++;
    displayQuestion();
}

function submitQuiz() {
    // get selected answer for the current qns
    const selectedAnswer = document.querySelector("input[name='quiz']:checked");
    // if answer is not selected then show alert to prevent player from skipping the qns  
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    // stores the player answer for the final qns
    playerAnswers[currentQuestionIndex] = parseInt(selectedAnswer.value);

    // calculate score
    calculateScore();

    // display results
    displayResults();
}

function calculateScore() {
    quizScore = 0;
    // loops through the quiz and if the user answer matches the correct answer then add score
    for (let i = 0; i < quizQuestions.length; i++) {
        if (playerAnswers[i] === quizQuestions[i].correct)
            quizScore++;
    }
}

function displayResults() {
    // hide quiz elements
    quizContent.style.display = "none";
    quizQuestion.style.display = "none";
    quizButtons.style.display = "none";

    // show score and detailed results
    let quizResults = "<h3>Quiz Complete!</h3>" + "<p><b>Your Score: " + quizScore + "/" + quizQuestions.length + "</b></p>";

    // show feedback on how well the player did
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let feedback = "";

    if (percentage >= 80)
        feedback = "Excellent! You're a landmarks expert!";
    else if (percentage >= 60)
        feedback = "Good job! You know your landmarks well!";
    else if (percentage >= 40)
        feedback = "Not bad, but there's room for improvement!";
    else
        feedback = "Keep studying! Practice makes perfect!";

    quizResults += "<p><b>" + percentage + "%</b></p>" + "<p>" + feedback + "</p>";

    quizScoreDisplay.innerHTML = quizResults;
    quizScoreDisplay.style.display = "block";
    quizRestartBtn.style.display = "block";
}

function restartQuiz() {
    // hide score and restart btn then show start btn and quiz intro
    quizScoreDisplay.style.display = "none";
    quizRestartBtn.style.display = "none";
    startQuizBtn.style.display = "block";
    quizIntroTxt.style.display = "block";

    // reset quiz variables
    currentQuestionIndex = 0;
    playerAnswers = [];
    quizScore = 0;
}

// ======= VISITING EXPERIENCE FORM (page5) =======
showFeedbackBtn.addEventListener("click", function () {
    // get all the form values
    const name = document.querySelector("#userName").value;
    const landmark = document.querySelector("#landmark").value;
    const ratingInput = document.querySelector("input[name='stars']:checked");
    const comment = document.querySelector("#userComment").value;

    let rating;
    if (ratingInput)
        rating = ratingInput.value;
    else
        rating = "No rating";

    let results = "<p><b>" + name + "</b> visited <b>" + landmark + "</b></p>" + "<p>Rating: " + rating + "/5</p>";

    // if there is a comment then add on the comment
    if (comment)
        results += "<p>Comment: " + comment + "</p>";

    // show results
    document.querySelector("#result").innerHTML = results;
});

// ======= FUNCTION TO RESET EVERYTHING =======
function resetAllElements() {
    // reset landmark info toggle
    const landmarkInfos = document.querySelectorAll(".landmark-info");
    for (let i = 0; i < landmarkInfos.length; i++) {
        landmarkInfos[i].classList.remove("show");
    }

    // reset grid gallery to first image
    for (let i = 0; i < gridItems.length; i++) {
        const container = gridItems[i];
        const images = container.querySelectorAll('img');
        for (let j = 0; j < images.length; j++) {
            if (j === 0)
                images[j].style.display = 'block';
            else
                images[j].style.display = 'none';
        }
    }

    // reset continent gallery
    if (gallery) {
        gallery.style.display = "none";
        gallery.innerHTML = "";
        currentContinent = null;
    }

    // minigame
    if (mazeArea && controls && questionElement && livesElement && startBtn) {
        mazeArea.style.display = "none";
        controls.style.display = "none";
        questionElement.style.display = "none";
         livesElement.style.display = "none";
        startBtn.style.display = "block";
        gameIntro.style.display = "block"; 
        messageElement.textContent = "";

        // reset player position
        playerX = 100;
        playerY = 250;
        lives = 3;
        currentQuestion = 0;
        correctLandmark = "";

        // allow movement button
        if (leftBtn && rightBtn && upBtn && downBtn) {
        leftBtn.disabled = false;
        rightBtn.disabled = false;
        upBtn.disabled = false;
        downBtn.disabled = false;
        }
      }

    // reset scroll to top
    if (scrollContainer) {
    scrollContainer.scrollTop = 0;
    }

    // hide all description on cultural significance page
    for (let i = 0; i < descriptions.length; i++) {
    descriptions[i].style.display = 'none';
    }
    if (descriptions.length > 0) 
    descriptions[0].style.display = 'block';

    // quiz
    if (quizContent && quizQuestion && quizButtons && quizScoreDisplay && quizRestartBtn && startQuizBtn && quizIntroTxt) {
    // hide all quiz elements
    quizContent.style.display = "none";
    quizQuestion.style.display = "none";
    quizButtons.style.display = "none";
    quizScoreDisplay.style.display = "none";
    quizRestartBtn.style.display = "none";

    // show btn and intro txt
    startQuizBtn.style.display = "block";
    quizIntroTxt.style.display = "block";

    // reset quiz variables
    currentQuestionIndex = 0;
    playerAnswers = [];
    quizScore = 0;
    }

    // form
    const form = document.querySelector("form");
    if (form) {
    form.reset(); 
    }

    // clear the form result display
    const resultDiv = document.querySelector("#result");
    if (resultDiv) 
    resultDiv.innerHTML = "";

    // reset hamburger menu
    if (menuItemsList && hamBtn) {
    menuItemsList.classList.remove("menuShow");
    hamBtn.innerHTML = "Open Menu";
    }
}