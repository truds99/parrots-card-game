const numberCards = prompt ("Pick a number (pair) from 4 to 14 cards to play");
const images = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
images.sort(compare);

function compare() { 
	return Math.random() - 0.5; 
}

function renderDeck(){
    const deck = [];
    for (let i=0; i<numberCards/2; i++ ){
        deck.push(images[i]);
        deck.push(images[i]);
    }
    deck.sort(compare);
    for (let i=0; i<numberCards; i++){
        let image = deck[i];
        document.querySelector(".board").innerHTML += `
        <div onclick="flipCard(this)" class="card">
            <div class="card-content">
                <div class="card-back">
                    <img src="usefulFiles/front.png" alt="parrot">
                </div>
                <div class="card-front">
                    <img src="usefulFiles/${image}.gif">
                </div>
            </div>
        </div>`
    }
}

renderDeck();

function flipCard (card){
    card.classList.toggle("frontFace");
}