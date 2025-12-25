const board = document.getElementById('game-board');
let flippedCards = [];
let lockBoard = false;

// הגדרת כמות קלפים לכל רמה (זוגות)
const levels = {
    1: 4,  // 4 קלפים (2 זוגות)
    2: 8,  // 8 קלפים (4 זוגות)
    3: 12, // 12 קלפים
    4: 16  // 16 קלפים
};

function startGame(level) {
    board.innerHTML = ''; // ניקוי הלוח
    flippedCards = [];
    const numberOfCards = levels[level];
    
    // יצירת מערך סמלים (כפול 2 לכל סמל)
    const icons = ['🔥', '⭐', '🎈', '🍀', '🍎', '🌈', '💎', '🐱'];
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
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">?</div>
            <div class="card-front">${icon}</div>
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
    const isMatch = card1.querySelector('.card-front').innerText === card2.querySelector('.card-front').innerText;

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