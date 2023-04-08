window.addEventListener('load', init);
//Global vars
let accuracy= 100;
let mistakes=0;
let wpm = 0;
let isPlaying = false;
let cDown = 5;
let words = 0;
let letters = 0;
let start;
let now;
let wrong = false;
let place;
let combinations = [];
var combo;
let first = true;

//DOM elements
const timeIndicator = document.querySelector('#count-down');
const wordInput = document.querySelector('#word-input');  //text input
let chosenPhrase = document.querySelector('#chosen-phrase');  //word to be typed as displayed
const accDisplay = document.querySelector('#accuracy');
const wpmDisplay = document.querySelector('#wpm');
const seconds = document.querySelector('#seconds');
const message = document.querySelector('#message');
const advance = document.querySelector('#next-game');
const textToReset = document.querySelector('#start-over');
const generateButton = document.querySelector('#run-script-btn');


const prompts = [
    "The calendar loses a precious component. The remaining months gather to mourn.",
    "A man who has to sell a loaf of bread in order to buy a slice is not free."
    

];
const promptlabels = [
    "- Hunter X Hunter 2011 (Anime), Author: Yoshihiro Togashi, Studio: Madhouse",
    "- Unknown",
    "- One Piece (Manga), Author: Eichiiro Oda",
    "- Mass Effect (Videogame)",
    "- Sir David Attenborough"
]


//Initialise game
function init(){
    //load first word from first array
    //advance.style.visibility='hidden';
    setInterval(countdown, 1000);
    setTimeout(function(){
        showPrompt(prompts);
    }, 5000);
    //getData();
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
    isPlaying = true;
    wordInput.addEventListener('input', letterMatch);

}

function letterMatch(){
    if(isMatching()){
        //console.log("Match");
    }
    if(isCompleted()){
        wordInput.readOnly = true;
        wordInput.value="";
        message.innerHTML = 'Finished!';
        console.log("Finished");
        advance.style.visibility='visible';
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
            if(text[text.length-1] === " "){
                words +=1;
                console.log(words);
                wordInput.value = "";
            }
            
            return true;
        }else{
            message.innerHTML = '';
            wordInput.style.borderColor='red';
            wordInput.style.backgroundColor='pink';
            mistakes += 1;
            place=text.length-1;    //saves place of the letter that is incorrect
            //combinations.push(prompt.substring(prompt[letters-1],prompt[letters]));
            if(mistakes === 1){
                combo = prompt.substring((letters-1),(letters+1));
                console.log(combo);
            }
            let test = prompt.substring((letters-1),(letters+1));
            console.log(test);
            //console.log(combinations[mistakes-1]);
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
}

function countdown(){
    // Wait for time to run out
        if(cDown > 0){
            cDown--;
            
            
        }else if(cDown === 0){
            isPlaying = true;
            timeIndicator.style.visibility='hidden';
            return;
        }
    // Show time
    seconds.innerHTML = cDown;
}

function calcAccuracy(){
    accuracy = ((letters-mistakes)/letters)*100;
    accuracy = accuracy.toFixed(2);
    accDisplay.innerHTML = Math.round(accuracy);
    //console.log(accuracy);
}

function calcWPM(){
    now = Date.now();
    let elapsed = (now-start)/1000;
    wpm = (words/elapsed)*60;
    wpmDisplay.innerHTML = wpm.toFixed(2);
    //console.log(wpm);
}

function resetText(){
    chosenPhrase.style.visibility = 'visible';
    console.log("Should work too");
    accuracy= 100;
    mistakes=0;
    wpm = 0;
    isPlaying = false;
    cDown = 5;
    words = 0;
    letters = 0;
    first = false;
    timeIndicator.style.visibility = 'visible';
    init();
}