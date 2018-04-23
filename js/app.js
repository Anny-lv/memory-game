
//Declaring variables

const cardDeck = document.querySelector('.deck');
/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];


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

//shuffle cards and assign new clases to html
	cards = shuffle(cards)
	for (let i = 0; i < cards.length; i++){
		cardDeck.innerHTML = '';
		[].forEach.call(cards, function(item){
			cardDeck.appendChild(item);
		});
		cards[i].classList.remove("show", "open", "match");
	}
};


let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    
};


function openList(){
	matchedCards.push(this);
	if (matchedCards.length === 2){
		if (matchedCards[0].firstElementChild.className === matchedCards[1].firstElementChild.className){
			matchCard();
			matchedCards = [];
		} else {
			unmatchCard();
			matchedCards = [];
		}
	}
}

function matchCard () {

card.classList.add("match");
};

function unmatchCard () {
	setTimeout(function(){
		card.classList.remove("open", "show", "disable");
	}, 1000);
};

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
