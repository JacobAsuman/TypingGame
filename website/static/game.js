window.addEventListener('load', init);
//Global vars
let accuracy= 100;
let mistakes=0;
let wpm = 0;
let isPlaying = false;
var cDown = 5;
let words = 0;
let letters = 0;
let start;
let now;
let wrong = false;
let place;
let combinations = [];
var combo;
let first = true;
let omErrors = [];
let subErrors = [];
let insErrors = [];
let orderErrors;


//DOM elements
const timeIndicator = document.querySelector('#count-down');
const wordInput = document.querySelector('#word-input');  //text input
let chosenPhrase = document.querySelector('#chosen-phrase');  //word to be typed as displayed
const accDisplay = document.querySelector('#accuracy');
const wpmDisplay = document.querySelector('#wpm');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');
const advance = document.querySelector('#next-game');
const generateButton = document.querySelector('#run-script-btn');
const waitText = document.querySelector('#wait-please');


var intervalID = null;

//Chart elements

let accuracyChart = new Chart(document.getElementById('accuracyChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Accuracy',
        data: [],
        borderColor: 'white',
        fontColor: 'white',
        fill: false
      }]
    },
    options: {
      scales: {
        xAxes: [{
          ticks: {
            fontColor: 'white'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: 'white',
            suggestedMax: 100,
            suggestedMin: 0
          }
        }]
      },
      legend: {
        labels: {
          fontColor: 'white'
        }
      }
    }
  });

  let wpmChart = new Chart(document.getElementById('wpmChart'), {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Words per minute',
        data: [],
        borderColor: 'yellow',
        fill: true
      }]
    },
    options: {
      scales: {
        xAxes: [{
            ticks: {
                fontColor: 'white'
            }
        }],
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            fontColor: 'white'
          }
        }]
      },
      legend: {
        labels: {
            fontColor: 'white'
        }
      }
    }
  });

let prompts = [
    "The calendar loses a precious component. The remaining months gather to mourn.",
    "A man who has to sell a loaf of bread in order to buy a slice is not free.",
    "You exist because we allow it. And you will end because we demand it.",
    "An understanding of the natural world is a source of not only great curiosity, but great fulfilment.",
    "So I walked back to my room and collapsed on the bottom bunk, thinking that if people were rain, I was drizzle and she was hurricane."
];
const promptlabels = [
    "- Hunter X Hunter 2011 (Anime), Author: Yoshihiro Togashi, Studio: Madhouse",
    "- Unknown",
    "- Mass Effect (Videogame)",
    "- Sir David Attenborough",
    "- Author: John Green"
]


//Initialise game
function init(){
    if (intervalID) {
        clearInterval(intervalID);  //resets timer if new round
      }
    timeIndicator.style.visibility = 'visible';
    intervalID = setInterval(countdown, 1000);
    setTimeout(function(){
        showPrompt(prompts);
    }, 5000);
}

// Choose random prompt
function showPrompt(prompts){
    // Generate random prompt index
    if(first === true){
        const randIndex = Math.floor(Math.random() * prompts.length);
        //Output chosen prompt
        chosenPhrase.innerHTML = prompts[randIndex];
    }
    chosenPhrase.style.visibility = 'visible';
    wordInput.readOnly = false;
    start = Date.now();
    wordInput.addEventListener('input', letterMatch);

}

function letterMatch(){
    if(isMatching()){

    };
    if(isCompleted()){
      wordInput.readOnly = true;
      wordInput.value="";
      message.innerHTML = 'Finished!';
      console.log("Finished");
      advance.style.visibility='visible';
      generateButton.style.visibility='visible';
      generateButton.ariaDisabled = 'false'
      advance.addEventListener('click',function(){ 
          waitText.style.visibility = 'visible';
          generateButton.style.visibility = 'hidden';
          generateButton.ariaDisabled = "true";
      })
    }

    calcAccuracy();
    calcWPM();
    
}

function isMatching(){
    var text = document.getElementById('word-input').value; // Letters being typed
    var prompt = chosenPhrase.innerHTML;    // Letters needed to be typed
    if(!wrong){
        if(prompt[letters] === text[text.length-1]){  //Compare what's typed to what needs to be typed
            wordInput.style.borderWidth='thick';
            wordInput.style.borderColor='green';
            wordInput.style.backgroundColor='white';
            letters +=1;
            if(text[text.length-1] === " "){  //spacebar = new word
                words +=1;
                wordInput.value = "";
                updateCharts();
            }
            return true;
        }else{
            message.innerHTML = '';
            wordInput.style.borderColor='red';
            wordInput.style.backgroundColor='pink';
            mistakes += 1;
            place=text.length-1;    //saves place of the letter that is incorrect
            if(mistakes === 1){
                combo = prompt.substring((letters-1),(letters+1));
                console.log(combo);
            }
            wrong = true;
            return false;
        }
    }else if(prompt[letters] === text[place]){
        wordInput.style.borderWidth='thick';
        wordInput.style.borderColor='green';
        wordInput.style.backgroundColor='white';
        letters+=1;
        wrong = false;
        return true;
      }else{
        return false;
      }
}
function isCompleted(){
    var prompt = chosenPhrase.innerHTML;    // Letters needed to be typed
    if(letters === prompt.length){
        return true;
    }
    else if(first === false){
        if(letters === prompt.length-1){
          console.log(prompt.length-1);
          console.log(words);
          return true;
        }
    }else{
        return false;
    }
}

function countdown(){
    // Wait for time to run out
        if(cDown > 0){
            cDown--;
            console.log(cDown);
        }else if(cDown === 0){
            isPlaying = true;
            timeIndicator.style.visibility='hidden';
            return;
        }
    // Show time
    seconds.innerHTML = cDown;
    return
}

function calcAccuracy(){
    accuracy = ((letters-mistakes)/letters)*100;
    accDisplay.innerHTML = Math.round(accuracy);
}

function calcWPM(){
    now = Date.now();
    let elapsed = (now-start)/1000;
    wpm = (words/elapsed)*60;
    wpmDisplay.innerHTML = wpm.toFixed(2);
}

function resetText(){ //resets values, changes display
    waitText.style.visibility = 'hidden';
    chosenPhrase.style.visibility = 'hidden';
    advance.style.visibility = 'hidden';
    message.innerHTML = '';
    accuracyChart.data.labels = [];
    accuracyChart.data.datasets[0].data = [];
    accuracyChart.update();
    wpmChart.data.labels = [];
    wpmChart.data.datasets[0].data = [];
    wpmChart.update();
    accuracy= 100;
    mistakes=0;
    wpm = 0;
    isPlaying = false;
    words = 0;
    letters = 0;
    cDown = 5;
    first = false;
    timeIndicator.style.visibility = 'visible';
    init();
}

function updateCharts(){
    accuracyChart.data.labels.push(words);
    accuracyChart.data.datasets[0].data.push(accuracy);
    wpmChart.data.labels.push(words);
    wpmChart.data.datasets[0].data.push(wpm);
    wpmChart.update();
    accuracyChart.update();
}