
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
};

//on reload start a new game
document.body.onload = newGame();

	function newGame(){

//Clear matched card collection
	matchedCards = [];

//Clear moves
	countMoves = 0;
	moveCounter();


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


//Restart game when clicking on restart icon
restart.onclick = reloadFun;

function reloadFun() {
    location.reload();
}

//Check if cards match
function openList(){
    matchedCards.push(this);
    if (matchedCards.length === 2){
        if (matchedCards[0].firstElementChild.className === matchedCards[1].firstElementChild.className){
            matchCard();
            allMatched.push(matchedCards[0].firstElementChild.className, matchedCards[1].firstElementChild.className);
            matchedCards = [];
            moveCounter();
            if (allMatched.length==16) {
            	gameOver ();

            }
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


//Start the timer when new game is started
let secondsElapsed = 0;

let x = setInterval(function() {
  if (newGame) {
    secondsElapsed++;
 };

document.getElementsByClassName("timer")[0].innerHTML =
  `<i class='fa fa-clock-o'></i>
  ${(Math.floor(secondsElapsed / 60) < 10) ?
    ('0' + Math.floor(secondsElapsed / 60)) :
    Math.floor(secondsElapsed / 60)}:${
    (secondsElapsed % 60 < 10) ?
    ('0' + secondsElapsed % 60) : secondsElapsed % 60}`;
  }, 1000
 
);

function gameOver() {
    modal.style.display = "block";
    secondsElapsed =0;
};

//Modal

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


////
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click', displayCard);
    card.addEventListener('click', openList);
    };


