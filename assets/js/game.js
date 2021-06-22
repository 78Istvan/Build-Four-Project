//flip the cards//
let cards = [];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard, moveCount=0;

(function createCardsArray() {
    let flipCards = [],
        duplicates = [];
    for(let x=1; 8 >= x; x++) {
        flipCards.push('<div class="card" data-name="space-skin">' +
                        '<img class="front-card" data-source="'+ x +'" src="assets/images/battleland-'+ x +'.jpg" alt="space-skin">' +
                        '<img class="back-card" src="assets/images/yellow-1.jpg" alt="yellow-top">' +
                        '</div>');
    }

    for(var i = 0; i< flipCards.length;++i){
        duplicates.push(flipCards[i]);
        duplicates.push(flipCards[i]);
    }

    flipCards = duplicates;
    card = flipCards;
    shuffleArray(flipCards);
}())

function shuffleArray(flipCards) {
    for (let i = flipCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flipCards[i], flipCards[j]] = [flipCards[j], flipCards[i]];
    }
    createCards(flipCards);
}

function createCards(flipCards) {
    let container = document.getElementById('game-container');

    container.innerHTML = flipCards.join("");
    cards = document.querySelectorAll('.card');
}
//turn up cards and check are they matching or not
function flipCard() {
    if (lockBoard) return;
    moveCount++;
    $('.moves').text(moveCount);
    this.classList.add('flip');

    if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this.children[0].dataset['source'];
    return
    }

    secondCard = this.children[0].dataset['source'];
    hasFlippedCard = false;

    checkForMatch();
}

//metch cards will be desabled to flip
function checkForMatch() {
    if (firstCard === secondCard) {
        disableCards();
        return
    }
    unflipCards();
}
//match cards don`t flip back if clicked
function disableCards() {
    let cardOne = $('div [data-source="'+firstCard+'"]');
    cardOne.parent().off('click', flipCard);
}
//unmatchig cards flips back after 1s and you can move to another card to flip
function unflipCards() {
    lockBoard = true;
    let cardOne = $('div [data-source="'+firstCard+'"]'),
        cardTwo = $('div [data-source='+secondCard+']');
    setTimeout(() => {
        cardOne.parent().removeClass('flip');
        cardTwo.parent().removeClass('flip');
        lockBoard = false;
    }, 1000);
}
//reset moves and card board
function resetGame() {
    $('.card').removeClass('flip');
    moveCount=0;
     $('.moves').text(moveCount);
    shuffleArray(cards);
    shuffleArray();
    
}
function gameOver() {
    if 
}
cards.forEach(card => card.addEventListener('click', flipCard));


