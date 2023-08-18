let bottomSection = document.querySelector(".bottom-section");
let container = document.querySelector(".container");
let Hit = document.querySelector(".hit");
let Time = document.querySelector(".time");
let Score = document.querySelector(".score");
let start = document.querySelector(".start");
let restart = document.querySelector(".restart");
let ender = document.querySelector(".ender");
let allBUbble = document.querySelector(".bottom-section");
let arrayAllBubble ;
let finalScore = document.querySelector("#finalScore");
let closeBtn = document.querySelector(".close-icon");
let highScore = document.querySelector(".highScore");
let toggleBtn = document.querySelector(".mode-toggler");
let introBox=document.querySelector(".intro-box");
let timeOption=document.querySelector("#timerOption");


let content = "";
let data = 2;
let mini = 1;
let maxi = 9;
let indicator = 0;
let hitValue = 0;
let timeDuration = 10;
let currentScore = 0;
let maxScore = 0;


bubbleGenerator();
getData();


//   Function to generate a random number

function getRandom() {
  let randomNumber = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
  return randomNumber;
}


//    Function to generate bubbles

function bubbleGenerator() {
  for (let x = 0; x <= 95; x++) {
    let x = `<div class="bubble">${""}</div>`;
    content += x;
  }
  
  bottomSection.innerHTML = content;
}

//    Function to generate random number inside bubbles  

function dataChanger() {
  arrayAllBubble.forEach((element) => {
    element.innerHTML = getRandom();
  });
}

//    Function for timer 

let setId;
function timer() {
  setId = setInterval(() => {
    --timeDuration;
    Time.innerHTML = timeDuration;
    if (timeDuration === 0) {
      endFunctionality();
      clearInterval(setId);
    }
  }, 1000);
}

//    Functionality of start button

start.addEventListener("click", () => {
  if (indicator == 0) {
    arrayAllBubble = document.querySelectorAll(".bubble")
    timeDuration=timeOption.value;
    Time.innerHTML = timeDuration;
    hitValue = getRandom();
    Hit.innerHTML = hitValue;
    dataChanger();
    timer();
    indicator = 1;
  }
});

//     Functionality for restart button

restart.addEventListener("click", () => {
  document.body.classList.remove("boxActive");
  hitValue = getRandom();
  Hit.innerHTML = hitValue;
  dataChanger();
  clearInterval(setId);
  timeDuration = timeOption.value;
  Time.innerHTML = timeDuration;
  timer();
  ender.classList.remove("active");
});

bottomSection.addEventListener("click", (e) => {
  if (indicator === 1) {
    if (e.target.innerHTML == hitValue) {
      currentScore += 10;
      dataChanger();
      clearInterval(setId);
      timeDuration++;
      Time.innerHTML = timeDuration;
      timer();
    } else {
      currentScore -= 1;
    }
    Score.innerHTML = currentScore;
  }
});

function endFunctionality() {
  ender.classList.add("active");
  document.body.classList.add("boxActive");
  maxScore=Math.max(currentScore,maxScore)
  console.log(maxScore);
  saveData();
  highScore.innerHTML=localStorage.getItem("gameScore");
  finalScore.innerHTML=currentScore;
  hitValue = 0;
  Hit.innerHTML = hitValue;
  currentScore = 0;
  Score.innerHTML = 0;
  arrayAllBubble.forEach((element) => {
    element.innerHTML = "";
  });
}

closeBtn.addEventListener("click", () => {
  if (ender.classList.contains("active")) {
    ender.classList.remove("active");
    document.body.classList.remove("boxActive");
    // endFunctionality();
    clearInterval(setId);
    timeDuration = timeOption.value;
    indicator = 0;
  }
});

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("toggler");
});

function saveData() {
  let x=localStorage.getItem("gameScore");
  localStorage.removeItem("gameScore");
  let d=Math.max(x,maxScore);
  localStorage.setItem("gameScore", d);
}

function getData(){
  highScore.innerHTML=localStorage.getItem("gameScore");
}

introBox.addEventListener("click",()=>{
  introBox.classList.remove("show");
})