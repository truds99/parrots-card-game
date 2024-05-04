const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
images.sort(compare);
let deck = [];
let numberCards = 0, count = 0, countPlays = 0, hits = 0, seconds = 0, card1, card2, myInterval;
const row1 = document.querySelector(".firstRow"), row2 = document.querySelector(".secondRow");
   
function compare(){ 
	return Math.random() - 0.5; 
}

function renderDeck(){
    for (let i = 0; i < numberCards / 2; i++) {
        deck.push(images[i]);
        deck.push(images[i]);
    }
    deck.sort(compare);

    // 2 equal rows of cards as a matter of design.
    for (i = 0; i < numberCards / 2; i++) {
        let image = deck[i];
        row1.innerHTML += `
            <div onclick="flipCard(this)" class="card">
                <div class="card-content">
                    <div class="card-back">
                        <img src="usefulFiles/front.png" alt="parrot">
                    </div>
                    <div class="card-front">
                        <img src="usefulFiles/${image}.gif" alt="${image}">
                    </div>
                </div>
            </div>`;
    }
    for (i = numberCards / 2; i < numberCards; i++) {
        let image = deck[i];
        row2.innerHTML += `
            <div onclick="flipCard(this)" class="card">
                <div class="card-content">
                    <div class="card-back">
                        <img src="usefulFiles/front.png" alt="parrot">
                    </div>
                    <div class="card-front">
                        <img src="usefulFiles/${image}.gif" alt="${image}">
                    </div>
                </div>
            </div>`;
    }
}

function flipCard(card) {
    if (card.classList.contains("frontFace") === false && count != 2) {
        if (count === 0) {
            card.classList.add("frontFace", "card1");
            card1 = card;
            count = 1;
        }   
        else { 
            count = 2;
            card.classList.add("frontFace", "card2");
            card2 = card;
            if (card1.innerHTML === card2.innerHTML){
                resetCards();
                hits ++;
                if (hits === numberCards/2) {
                    setTimeout(endGame, 650);   
                }
            }   
            else {
                setTimeout(unflipCards, 1000);
            }
        }
        countPlays ++;    
    }
}

function unflipCards(){
    card1.classList.remove("frontFace");
    card2.classList.remove("frontFace");
    resetCards();
}

function resetCards(){
    card1.classList.remove("card1");
    card2.classList.remove("card2");
    count = 0;    
}

function endGame(){
    alert(`You won in ${countPlays} plays and ${seconds} seconds`);
    clearInterval(myInterval);
    const restart = confirm("Play again?");
    if (restart) {
        window.location.reload();
    }
}

function numberCardsInvalid () {
    if (numberCards < 4 || numberCards > 14 || numberCards % 2 != 0){
        return true;
    }
    return false;
}

function clock(){
    document.querySelector(".clock").innerHTML = seconds;
    seconds ++;
}

function start(){
    do {
        numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
    }   while (numberCardsInvalid());
    renderDeck();
    myInterval = setInterval(clock, 1000);
}

start();