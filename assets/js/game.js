//flip the cards//
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCrad() {
    if (lockBoard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return
}

secondCard = this;
hasFlippedCard = false;

checkForMatch();
}
//checks cards are matching//
function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        return
    }
    unflipCards();
}
//match cards don`t flip back if clicked//
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCrad);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1500);
}

(function shuffle() {
    cards.forEach(card => {
        let shuffPosi = Math.floor(Math.random() * 16);
        card.style.order = shuffPosi;
        console.log(shuffle)
    })
})();

cards.forEach(card => card.addEventListener('click', flipCrad))


