let cards = [],
    flipCardsArray = [],
    flippedCardsCount = 0,
    numberOfPairs = 8, 
    level = 1,
    setText = {
        levelString: 'Are you ready for the next level?',
        lastLevelString: 'CONGRATULATIONS You have completed all the levels, would you like another game?'
    },
    firstFlip = 0,
    seconds = 0,
    hasFlippedCard = false,
    lockBoard = false,
    firstCard, secondCard, moveCount=0;

(function init() {
    createCardsArray();
}())

function createCardsArray() {
    let flipCards = [],
        duplicates = [];
    level === 2 ? numberOfPairs = 6 : level === 3 ? numberOfPairs = 8 : numberOfPairs = 4;
    for(let x=1;  numberOfPairs >= x; x++) {
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
    flipCardsArray = flipCards;
    shuffleArray();
}

function shuffleArray() {
    let flipCards = [...flipCardsArray];
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
    cards.forEach(card => card.addEventListener('click', flipCard));
}

//turn up cards and check are they matching or not
function flipCard() {
    if (!this.classList.contains('flip')) {
    firstFlip === 0 ? startTimer() : firstFlip++;
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
}

//metch cards will be desabled to flip
function checkForMatch() {
    if (firstCard === secondCard) {
        flippedCardsCount++;

        disableCards();
        flippedCardsCount === numberOfPairs ? gameOver() : false;
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
    seconds=0;
    level=1;
    cards=[];
    $('.moves').text(moveCount);
    createCardsArray();
    
}

function gameOver() {
    flippedCardsCount = 0;
    firstFlip = 0;
    clearInterval(setTimer);
    addTextToModal();
    openModal();
}

function addTextToModal() {
    $(".steps-count").text(moveCount);
    $(".level-display").text(level);
    $(".second-count").text(seconds);
    level === 3 ? $(".level-text").text(setText.lastLevelString) : $(".level-text").text(setText.levelString);
}

function openModal() {
    moveCount=0;
    seconds=0
    level === 3 ? resetGame() : level++
    let modal = $('.game-over-modal');
    modal.toggle();
}

function closeModal() {
    let modal = $('.game-over-modal');
    $(".time").text(seconds);
    $('.moves').text(moveCount);
    modal.toggle();
    createCardsArray()
}
   
function startTimer() {
    firstFlip++
    setTimer = setInterval(function () {
        seconds++;
        $(".time").text(seconds);
    }, 1000);
}



