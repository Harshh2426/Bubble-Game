let bottomSection = document.querySelector(".bottom-section");
let container = document.querySelector(".container");
let Hit = document.querySelector(".hit");
let Time = document.querySelector(".time");
let Score = document.querySelector(".score");
let start = document.querySelector(".start");
let restart = document.querySelector(".restart");
let ender = document.querySelector(".ender");
let allBUbble = document.querySelector(".bottom-section");
let arrayAllBubble = allBUbble.childNodes;
let finalScore = document.querySelector("#finalScore");
let closeBtn = document.querySelector(".close-icon");
let highScore = document.querySelector(".highScore");
let toggleBtn = document.querySelector(".mode-toggler");

let content = "";
let data = 2;
let mini = 1;
let maxi = 9;
let indicator = 0;
let hitValue = 0;
let timeDuration = 10;
let currentScore = 0;
let maxScore = 0;

// highScore.style.background="yellow"

bubbleGenerator();
getData();

function getRandom() {
  let randomNumber = Math.floor(Math.random() * (maxi - mini + 1)) + mini;
  return randomNumber;
}

function bubbleGenerator() {
  for (let x = 0; x <= 95; x++) {
    let x = `<div class="bubble">${""}</div>`;
    content += x;
  }
  
  bottomSection.innerHTML = content;
}

function dataChanger() {
  arrayAllBubble.forEach((element) => {
    element.innerHTML = getRandom();
    console.log(window.getComputedStyle(element).width);
  });
}

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

start.addEventListener("click", () => {
  if (indicator == 0) {
    Time.innerHTML = timeDuration;
    hitValue = getRandom();
    Hit.innerHTML = hitValue;
    dataChanger();
    timer();
    indicator = 1;
  }
});

restart.addEventListener("click", () => {
  container.classList.remove("boxActive");
  hitValue = getRandom();
  Hit.innerHTML = hitValue;
  dataChanger();
  clearInterval(setId);
  timeDuration = 10;
  Time.innerHTML = timeDuration;
  timer();
  ender.classList.remove("active");
});

bottomSection.addEventListener("click", (e) => {
  if (indicator === 1) {
    if (e.target.innerHTML == hitValue) {
      currentScore += 10;
      dataChanger();
    } else {
      currentScore -= 1;
    }
    Score.innerHTML = currentScore;
  }
});

function endFunctionality() {
  ender.classList.add("active");
  container.classList.add("boxActive");
  finalScore.innerHTML = currentScore;
  maxScore = Math.max(maxScore, currentScore);
  console.log(maxScore);
  highScore.innerHTML = maxScore;
  hitValue = 0;
  Hit.innerHTML = hitValue;
  currentScore = 0;
  Score.innerHTML = 0;
  saveData();
  arrayAllBubble.forEach((element) => {
    element.innerHTML = "";
  });
}

closeBtn.addEventListener("click", () => {
  if (ender.classList.contains("active")) {
    ender.classList.remove("active");
    container.classList.remove("boxActive");
    // endFunctionality();
    clearInterval(setId);
    timeDuration = 10;
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
