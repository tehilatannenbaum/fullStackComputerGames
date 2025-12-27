const board = document.getElementById('game-board');
let flippedCards = [];
let lockBoard = false;

// הגדרת כמות קלפים לכל רמה (זוגות)
const levels = {
    1: 4,  // 4 קלפים (2 זוגות)
    2: 6,  // 6 קלפים (3 זוגות)
    3: 12,  // 12 קלפים (6 זוגות)
    4: 16, // 16 קלפים (8 זוגות)
};

function startGame(level) {
    board.innerHTML = ''; // ניקוי הלוח
    flippedCards = [];
    const numberOfCards = levels[level];
    
    // יצירת מערך סמלים (כפול 2 לכל סמל)
    const icons = [
    '../img/memory_cards/1.png',
    '../img/memory_cards/2.png',
    '../img/memory_cards/3.png',
    '../img/memory_cards/4.png',
    '../img/memory_cards/5.png',
    '../img/memory_cards/6.png',
    '../img/memory_cards/7.png',
    '../img/memory_cards/8.png',
    '../img/memory_cards/9.png',
    '../img/memory_cards/10.png',
    '../img/memory_cards/11.png',
    '../img/memory_cards/12.png',
    '../img/memory_cards/13.png',
    '../img/memory_cards/14.png',
    '../img/memory_cards/15.png',
    '../img/memory_cards/16.png'
    ];

    let gameIcons = icons.slice(0, numberOfCards / 2);
    gameIcons = [...gameIcons, ...gameIcons]; // הכפלה לזוגות
    
    // ערבוב קלפים
    gameIcons.sort(() => Math.random() - 0.5);

    // הגדרת הגריד ב-CSS בצורה דינמית
    board.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(numberOfCards))}, 100px)`;

    gameIcons.forEach(icon => {
        const card = createCard(icon);
        board.appendChild(card);
    });
}

function createCard(icon) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.cardId = icon;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">?</div>
            <div class="card-front">
                <img class="card-img" src="${icon}" alt="memory card"></div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    lockBoard = true;
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.cardId === card2.dataset.cardId;
    //const isMatch = card1.querySelector('.card-front').innerText === card2.querySelector('.card-front').innerText;

    if (isMatch) {
        resetBoard();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}