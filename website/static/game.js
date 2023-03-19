window.addEventListener('load', init);
//Global vars
let accuracy= 100;
let wpm = 0;
let isPlaying = false;
let cDown = 5;

//DOM elements
const timeIndicator = document.querySelector('#count-down');
const wordInput = document.querySelector('#word-input');  //text input
let chosenPhrase = document.querySelector('#chosen-phrase');  //word to be typed as displayed
const accDisplay = document.querySelector('#accuracy');
const wpmDisplay = document.querySelector('#wpm');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');


const prompts = [
    'The quick, brown fox jumped over the lazy dog.',
    'The calendar loses a precious component. The remaining months gather to mourn.',
    'A man who has to sell a loaf of bread in order to buy a slice is not free.'
];

//Initialise game
function init(){
    //load first word from first array
    
    setInterval(countdown, 1000);

    setTimeout(function(){
        showPrompt(prompts);
    }, 5000);
    
}

// Choose random prompt
function showPrompt(prompts){
    // Generate random prompt index
    const randIndex = Math.floor(Math.random() * prompts.length);
    //Output chosen prompt
    chosenPhrase.innerHTML = prompts[randIndex];
    let wordArr = prompts[randIndex].split(" ");
    wordInput.readOnly = false;
    //console.log("working so far...");
    //console.log(wordArr);
    //console.log("TESTing" + toType.substring(0, 1));
    isPlaying = true;
    wordInput.addEventListener('input', letterMatch);
}

function letterMatch(){
    if(isMatching()){
        console.log("Match");
    }
    if(isCompleted()){
        wordInput.readOnly = true;
        message.innerHTML = 'Finished!';
        console.log("Finished");
    }
    
}

function isMatching(){ 
    var text = document.getElementById('word-input').value; // Letters being typed
    var prompt = chosenPhrase.innerHTML;    // Letters needed to be typed
    console.log(prompt[text.length-1]);
    console.log(text[text.length-1]);
    console.log(chosenPhrase.innerHTML);
    console.log(text.length);
    console.log(prompt.length);
    if(prompt[text.length-1] === text[text.length-1]){  //Compare what's typed to what needs to be typed
        message.innerHTML = 'Correct!';
        wordInput.style.borderWidth='thick';
        wordInput.style.borderColor='green';
        //chosenPhrase.style.backgroundColor='green';
        //chosenPhrase.innerHTML = chosenPhrase.textContent.replace(prompt[text.length-1], match =>`<mark>${match[text.length-1]}</mark>`);
        //chosenPhrase.innerHTML = chosenPhrase.textContent.replace(chosenPhrase.innerHTML,"<span style='background-color: #FFFF00'>" + prompt.substring(0, text.length-1) + "</span>" + prompt.substring(text.length, prompt.length));
        return true;
    }else{
        message.innerHTML = '';
        wordInput.style.borderColor='red';
        return false;
    }
}
function isCompleted(){
    var text = document.getElementById('word-input').value; // Letters being typed
    var prompt = chosenPhrase.innerHTML;    // Letters needed to be typed
    if(text.length === prompt.length){
        return true;
    }
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

function checkPlaying(){
    if(!isPlaying){
        message.innerHTML = 'Game Over.';
    }
}