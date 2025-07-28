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
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});
hideall();


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

// timeline 
document.querySelectorAll('.grid-landmark').forEach(landmark => {
  const timeline = landmark.querySelector('.timeline');
  const imgContainer = landmark.querySelector('.timeline-image-container');
  const imgElement = imgContainer.querySelector('img');

  // when user clicks on a dot
  timeline.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const imgSrc = dot.getAttribute('data-img');
        imgElement.src = imgSrc;
        imgElement.style.display = 'inline-block';
        imgElement.style.opacity = '1';
      
    });

    // hide image when mouse leaves the dot and timeline
    dot.addEventListener('mouseleave', () => {
      // allow clicks inside image container if needed
      setTimeout(() => {
        // check if mouse is inside timeline or image container
        const isInTimeline = timeline.matches(':hover');
        const isInImage = imgContainer.matches(':hover');
        if (!isInTimeline && !isInImage) {
          imgElement.style.opacity = '0';
          setTimeout(() => 
          { 
            imgElement.style.display = 'none'; 
          }, 300);
        }
      }, 100);
    });
  });

  // hide image if mouse leaves timeline area completely
  timeline.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!timeline.matches(':hover') && !imgContainer.matches(':hover')) {
        imgElement.style.opacity = '0';
        setTimeout(() => { 
          imgElement.style.display = 'none'; 
        }, 300);
      }
    }, 100);
  });

});


// need to implement minigame (guess the architectural style)