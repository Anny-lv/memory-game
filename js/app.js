
/*
* Declaring variables 
*/

let cardDeck = document.getElementsByTagName("ul")[1];
let moveCount = document.getElementsByClassName('moves')[0];
let totalMoves = moveCount.innerText;

/*
 * Create a list that holds all of your cards
 */
let cardList = [
	             
	'fa fa-diamond',
    'fa fa-paper-plane-o',
    'fa fa-anchor',
    'fa fa-bolt',
    'fa fa-cube',
    'fa fa-leaf',
    'fa fa-bicycle',
    'fa fa-bomb'

];

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

//my functions >>>>> 

function gameReset() {
	shuffle(cardDeck);
	hideCards(cardDeck);
	}
//Opening card with a click

cardDeck.addEventListener('click',openCard);

function openCard(evt) {
   	const className = evt.target.classList;
    evt.target.classList.add('open');
    evt.target.classList.add('show');
	}

//check if cards match 
 



//hiding all the cards 
function hideCards(cardDeck) {
	{
    for (var i = 0; i<cardList.length; i++){
        cardList[i].style.backgroundColor="#2e3d49";
        cardList[i].style.color="#2e3d49";}
		}
	}
/*
 * DONE set up the event listener for a card. If a card is clicked: 
 * DONE- display the card's symbol (put this functionality in another function that you call from this one)
 * DONE add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
