//all variable declaration and initialisations here
var wordCategory,countries,animals,randomWord,lives,result,score;

window.onload= startGame;//starts chooseCat function when browser window is fully loaded

function startGame(isNextRound){
    wordCategory = ['countries','animals'];
    countries = ['usa','engaland','nepal','india','china','russia'];
    animals = ['cat','mouse','cow','racoon','wolf','tiger','bear'];

    randomWord; // this is the variable that will be used to store the selected word

    result = ""; // this is the variable we want to use to store blanks and progress

    lives = ""; //variable to set remaining lives
    if(isNextRound != true || isNextRound == "undefined"){
        score = 0; 
    }

    chooseCat();
    setLife();
    setScore();
}

//this function updates the score after player has successfully cleared the previous round
function nextRound(){
    score++;
    startGame(true);
}

//this function will initialise life
function setLife(){
    for(i=0;i<10;i++){
        lives = lives+"♥"
    }
    document.getElementById('lives').innerHTML = lives;
}

function setScore(){
    document.getElementById('score').innerHTML = score;
}

//this function will choose a category
function chooseCat(){
    category = wordCategory[Math.floor(Math.random() * wordCategory.length)];
    document.getElementById("category-name").innerHTML = category;
    chooseWord(category); //calling function to pick a random word from the chosen category
}

// this function will pick a word from that category
function chooseWord (category) {
    randomWord = this[category][Math.floor(Math.random() * this[category].length)];
    blanksFromAnswer(randomWord);
}


// this function will generate blanks based on the length of the chosen word
function blanksFromAnswer ( answerWord ) {
    for(i=0;i<answerWord.length;i++){
        result =result+"_"  
    }
    document.getElementById("blanks").innerHTML= result; 
}

// event listener that listens to the keys pressed on the keyboard
document.addEventListener('keypress', function(e) {
    var letter = String.fromCharCode(e.keyCode); // gets keycode and turns it into string and passes to the variable
    if(lives.length > 0){
        result = document.getElementById('blanks').innerHTML;
        guessLetter(letter,result,randomWord); // calling function to match the pressed key with the answer
    }else{
        var restart = confirm("You lost! Game over!\nRestart?");
        if(restart = true){
            startGame();
        }
    }
});

//this function changes the blanks into alphabets
function alterAt ( index, letter, originalString ) {
    return originalString.substr(0,index) + letter + originalString.substr(index+1,originalString.length); 
}


// this function checks if the entered key matches with the answer
function guessLetter( letter, result, answer) {
    var checkIndex = 0;
    checkIndex = answer.indexOf(letter);
    if(checkIndex >= 0){
        while ( checkIndex >= 0 ) {
            result = alterAt(checkIndex, letter, result); // calls and returns function that changes blanks into alphabets
            checkIndex = answer.indexOf(letter, checkIndex+1);
        }
    }
    else{
        lives = lives.substr(0, lives.length - 1); // this removes one life per wrong character
        document.getElementById("lives").innerHTML=lives;
    }
    document.getElementById("blanks").innerHTML= result; // this updates the blanks in the screen with the correct characters
    if(result === answer){
        nextRound(); // calling function to prepare next round
        alert("You won!");
    }
}

