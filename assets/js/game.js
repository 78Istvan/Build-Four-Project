//flip the cards//
const cards = document.querySelectorAll('.card');

function flipCrad() {
    this.classList.toggle('flip');
}
cards.forEach(card => card.addEventListener('click', flipCrad))


