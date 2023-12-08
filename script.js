const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
images.sort(compare);
const deck = [];
let count = 0, countPlays = 0, hits = 0, card1, card2;
let numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");

while (numberCards < 4 || numberCards > 14 || numberCards % 2 != 0){
        numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
    }

renderDeck();    

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
    if (count != 2) {
        if (count === 0) {
            card.classList.add("frontFace", "card1");
            card1 = card;
            count = 1;
        }   else { 
                card.classList.add("frontFace", "card2");
                card2 = card;
                count = 2;
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
    alert (`Você ganhou em ${countPlays} jogadas`);
}