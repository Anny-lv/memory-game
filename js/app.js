/*jshint esversion: 6 */
//Declaring variables

const cardDeck = document.querySelector('.deck');
let card = document.getElementsByClassName("card");
let cards = [...card];
let moves = document.querySelector(".moves");
let restart = document.querySelector(".restart");
let countMoves = 0;
const stars = document.querySelector(".stars");
let timeOn =0;
let endStars = document.querySelector(".endStars");

//Declare empty array for matching cards
let matchedCards = [];
let allMatched = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//on reload start a new game
document.body.onload = newGame();

// When a new game starts do the following >>
function newGame(){

//Clear matched card collection
    matchedCards = [];

//Clear moves
    countMoves = 0;
    moveCounter();

//shuffle cards and assign new clases to html
    cards = shuffle(cards);
    for (let i = 0; i < cards.length; i++){
        cardDeck.innerHTML = '';
        [].forEach.call(cards, function(item){
        cardDeck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match","disable");
    }
}


//Add classes to display card
let displayCard = function (){
    this.classList.add("open");
    this.classList.add("show");
    timeOn =1;
};


//Restart game when clicking on restart icon
restart.onclick = reloadFun;

function reloadFun() {
    location.reload();
    timeOn =0;
}

//Check if cards match
function openList(){
    matchedCards.push(this);
    if (matchedCards.length === 2){
            cardDeck.classList.add("disabled");
        if (matchedCards[0].firstElementChild.className === matchedCards[1].firstElementChild.className){
            matchCard();
            allMatched.push(matchedCards[0].firstElementChild.className, matchedCards[1].firstElementChild.className);
            matchedCards = [];
            moveCounter();
        if (allMatched.length==16) {
            gameOver ();}} 
    else {  
            cardDeck.classList.add("disabled");
            unmatchCard();
            moveCounter();
            
        }
    }
}



// Add classess to matched cards
function matchCard () {
    matchedCards[0].classList.add("open", "show", "match", "disable");
    matchedCards[1].classList.add("open", "show", "match", "disable");
     cardDeck.classList.remove("disabled");
    }

//Remove classes from unmatched cards
function unmatchCard () {
    setTimeout(function(){
         matchedCards[0].classList.remove("open", "show", "disable");
         matchedCards[1].classList.remove("open", "show", "disable");
         matchedCards = [];
         cardDeck.classList.remove("disabled");
     }, 1000);

  }


//Adding moves to counter
function moveCounter (){
    moves.innerHTML =  countMoves;
    countMoves++;

    //Setting star raiting

    if(countMoves < 15 )    {
        endStars.innerHTML = 'End Stars: ' + 3;
    }
    else if (countMoves >=  15 && countMoves < 21)  {
        stars.children[2].innerHTML = "";
        endStars.innerHTML = 'End Stars: ' + 2;
    }
    else if (countMoves >=  21) {
        stars.children[1].innerHTML = "";
        endStars.innerHTML = 'End Stars: ' + 1;
    }
}


//Start the timer when new game is started
let secondsElapsed = 0;

//Check if new game already started and if any clicks done
 setInterval(function() {
  if (newGame && timeOn == 1) {
    secondsElapsed++;
 }

//Math functions to get the time 
document.getElementsByClassName("timer")[0].innerHTML =
  `<i class='fa fa-clock-o'></i>
  ${(Math.floor(secondsElapsed / 60) < 10) ?
    ('0' + Math.floor(secondsElapsed / 60)) :
    Math.floor(secondsElapsed / 60)}:${
    (secondsElapsed % 60 < 10) ?
    ('0' + secondsElapsed % 60) : secondsElapsed % 60}`;
  }, 1000
 
);

//When all the cards are open do the following >>
function gameOver() {
    modal.style.display = "block";
    timeOn =0;
    getTime(); 
}

//Getting time when game ware finished
function getTime () {
  let currentTime = document.querySelector(".timer").innerHTML;
    document.querySelector(".endTime").innerHTML = 'End Time: ' + currentTime;

 } 


//*Congratulations modal
//
// Get the modal
const modal = document.getElementById('congrats');
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};



//Event listeners 
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openList);
    }