const numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
images.sort(compare);
const deck = [];
let cont = 0, card1, card2;

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

renderDeck();

function flipCard (card){
    if (cont === 0) {
        card.classList.add("frontFace", "card1");
        card1 = card;
        cont = 1;
    } else { 
        card.classList.add("frontFace", "card2");
        card2 = card;
            if (card1.querySelector(".card-content").querySelector(".card-front").querySelector("img").src === card2.querySelector(".card-content").querySelector(".card-front").querySelector("img").src){
                card1.classList.remove("card1");
                card2.classList.remove("card2");
            } else {
                setTimeout(unflipCards, 1000);
            }
            cont = 0;
        }
    }

function unflipCards (){
    document.querySelector(".card1").classList.remove("frontFace", "card1");
    document.querySelector(".card2").classList.remove("frontFace", "card2");
}