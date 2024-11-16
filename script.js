// script.js
const cards = document.querySelectorAll('.memory-card');
let flippedCards = [];
let matchedCards = 0;

// Função para embaralhar a segunda linha
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
}

// Função para organizar as cartas nas linhas
function organizeCards() {
    const fixedCards = Array.from(cards).slice(0, 5); // Cartões fixos na primeira linha
    const shuffledCards = Array.from(cards).slice(5); // Cartões para embaralhar na segunda linha
    
    // Embaralha os cartões da segunda linha
    shuffleArray(shuffledCards);

    const memoryGame = document.querySelector('.memory-game');
    
    // Adiciona as cartas fixas na primeira linha
    fixedCards.forEach(card => memoryGame.appendChild(card));
    
    // Adiciona as cartas embaralhadas na segunda linha
    shuffledCards.forEach(card => memoryGame.appendChild(card));
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        // Verifica se temos duas cartas viradas
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.name === secondCard.dataset.name) {
        matchedCards += 2; // Contabiliza as cartas combinadas
        flippedCards = [];
    } else {
        // Se não houver correspondência, desvira as cartas após um curto atraso
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Adiciona o evento de clique em cada cartão
cards.forEach(card => card.addEventListener('click', flipCard));

// Chama a função de organização das cartas quando a página é carregada
window.onload = organizeCards; // Organiza as cartas com a ordem solicitada
