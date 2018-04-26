
//Declaring variables

const cardDeck = document.querySelector('.deck');
let card = document.getElementsByClassName("card");
let cards = [...card];
let moves = document.querySelector(".moves")
let restart = document.querySelector(".restart")
let countMoves = 0;
const stars = document.querySelector(".stars")



//Declare empty array for matching cards
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function newGame(){

//Clear matched card collection
	matchedCards = [];

//Clear moves
	countMoves = 0;
	timeStamp();
	moveCounter();

//Reset stars
//	    for (let i= 0; i < stars.length; i++){
 //       const star = stars[i].childNodes[0];
 //       star.className.add('fa fa-star');
// }


//shuffle cards and assign new clases to html
	cards = shuffle(cards)
	for (let i = 0; i < cards.length; i++){
		cardDeck.innerHTML = '';
		[].forEach.call(cards, function(item){
		cardDeck.appendChild(item);
		});
		cards[i].classList.remove("show", "open","disable");
	}


};



//Add classes to display card
let displayCard = function (){
    this.classList.add("open");
    this.classList.add("show");
    
};

restart.onclick = newGame;

//Check if cards match
function openList(){
    matchedCards.push(this);
    if (matchedCards.length === 2){
        if (matchedCards[0].firstElementChild.className === matchedCards[1].firstElementChild.className){
            matchCard();
            matchedCards = [];
            moveCounter();
        } else {    
            unmatchCard();
            moveCounter();
        }
    }
}


// Add classess to matched cards
function matchCard () {
	 matchedCards[0].classList.add("open", "show", "disable");
     matchedCards[1].classList.add("open", "show", "disable");
};

//Remove classes from unmatched cards
function unmatchCard () {
    setTimeout(function(){
         matchedCards[0].classList.remove("open", "show", "disable");
         matchedCards[1].classList.remove("open", "show", "disable");
         matchedCards = [];
     }, 1000);
  };


//Adding moves to counter
function moveCounter (){
	moves.innerHTML =  countMoves;
	countMoves++;

	//Setting star raiting

	if(countMoves >=  12 && countMoves < 17)	{
		stars.children[2].innerHTML = "";
	}
	else if (countMoves >=  17 && countMoves < 24)	{
		stars.children[1].innerHTML = "";
	}
	else if (countMoves >=  24)	{
		stars.children[0].innerHTML = "";
	}
}



//Count up timer, source: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

function timeStamp() {
// Create a date object with the current time
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
 	 	}
	}
 }


for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openList);
    };
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
