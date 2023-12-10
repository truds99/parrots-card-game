const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
let deck = [];
let numberCards = 0, count = 0, countPlays = 0, hits = 0, seconds = 0, card1, card2, myInterval, row1, row2;
   
function compare() { 
	return Math.random() - 0.5; 
}

function renderDeck(){
    for (let i=0; i<numberCards/2; i++){
        deck.push(images[i]);
        deck.push(images[i]);
    }
    deck.sort(compare);
    for (i=0; i<numberCards/2; i++){
        let image = deck[i];
        document.querySelector(".firstRow").innerHTML += `
        <div onclick="flipCard(this)" class="card">
            <div class="card-content">
                <div class="card-back">
                    <img src="usefulFiles/front.png" alt="parrot">
                </div>
                <div class="card-front">
                    <img src="usefulFiles/${image}.gif" alt="${image}">
                </div>
            </div>
        </div>`
    }
    for (i=numberCards/2; i<numberCards; i++){
        let image = deck[i];
        document.querySelector(".secondRow").innerHTML += `
        <div onclick="flipCard(this)" class="card">
            <div class="card-content">
                <div class="card-back">
                    <img src="usefulFiles/front.png" alt="parrot">
                </div>
                <div class="card-front">
                    <img src="usefulFiles/${image}.gif" alt="${image}">
                </div>
            </div>
        </div>`
    }
}

function flipCard (card){
    if (card.classList.contains("frontFace") === false && count != 2) {
        if (count === 0) {
            card.classList.add("frontFace", "card1");
            card1 = card;
            count = 1;
        }   else { 
                count = 2;
                card.classList.add("frontFace", "card2");
                card2 = card;
                if (card1.querySelector(".card-content").querySelector(".card-front").querySelector("img").src === card2.querySelector(".card-content").querySelector(".card-front").querySelector("img").src){
                    card1.classList.remove("card1");
                    card2.classList.remove("card2");
                    count = 0;
                    hits ++;
                    if (hits === numberCards/2) {
                        countPlays ++;
                        setTimeout(msg, 650);   
                    }
                }   else {
                        setTimeout(unflipCards, 1000);
                    }
            }
        countPlays ++;    
        }

    }

function unflipCards(){
    card1.classList.remove("frontFace", "card1");
    card2.classList.remove("frontFace", "card2");
    count = 0;
}

function msg() {
    alert(`Você ganhou em ${countPlays} jogadas e ${seconds} segundos`);
    clearInterval(myInterval);
    let restart = prompt("Play again? (yes or no)");
    if (restart === "yes") {
        row1 = document.querySelector(".firstRow");
        row2 = document.querySelector(".secondRow");
        row1.innerHTML = "";
        row2.innerHTML = "";
        start();
    }
}

function start(){
    images.sort(compare);
    deck = [];
    countPlays = 0;
    hits = 0;
    numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
    while (numberCards < 4 || numberCards > 14 || numberCards % 2 != 0){
        numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
    }
    renderDeck();
    seconds = 1;
    myInterval = setInterval(clock, 1000);
}

function clock(){
    document.querySelector(".clock").innerHTML = seconds;
    seconds ++;
}

start();