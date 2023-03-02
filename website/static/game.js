window.addEventListener('load', init);
//Global vars
let accuracy= 100;
let wpm = 0;
let isPlaying;
let cDown = 5;

//DOM elements
const timeIndicator = document.querySelector('#count-down');
const wordInput = document.querySelector('#word-input');  //text input
const chosenPhrase = document.querySelector('#chosen-phrase');  //word to be typed as displayed
const accDisplay = document.querySelector('#accuracy');
const wpmDisplay = document.querySelector('#wpm');
const seconds = document.querySelector('#seconds');


const prompts = [
    'The quick, brown fox jumped over the lazy dog.',
    'The calender loses a precious component. The remaining months gather to mourn.',
    'A man who has to sell a loaf of bread in order to buy a slice is not free.'
];

//Initialise game
function init(){
    //load first word from first array
    
    setInterval(countdown, 1000);

    setTimeout(function(){
        showPrompt(prompts);
    }, 5000)
    countdown();
}

// Choose random prompt
function showPrompt(prompts){
    // Generate random prompt index
    const randIndex = Math.floor(Math.random() * prompts.length);
    //Output chosen prompt
    chosenPhrase.innerHTML = prompts[randIndex];
}

// Countdown to start
function countdown(){
    // Wait for time to run out
        if(cDown > 0){
            console.log('casliifason')
            cDown--;
            
        }else if(cDown === 0){
            isPlaying = true;
            timeIndicator.style.visibility='hidden';
            return;
        }
    // Show time
    seconds.innerHTML = cDown;
}