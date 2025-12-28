const board = document.getElementById('game-board');
let flippedCards = [];
let lockBoard = false;

const levelPoints = {
  1: 100,
  2: 200,
  3: 300,
  4: 400
};

let currentLevel = 1;
let matchedPairs = 0;


// הגדרת כמות קלפים לכל רמה (זוגות)
const levels = {
    1: 4,  // 4 קלפים (2 זוגות)
    2: 6,  // 6 קלפים (3 זוגות)
    3: 12,  // 12 קלפים (6 זוגות)
    4: 16, // 16 קלפים (8 זוגות)
};

function setActiveLevel(level) {
  const buttons = document.querySelectorAll(".level-btn");

  buttons.forEach(btn => btn.classList.remove("active"));

  // רמה 1 = כפתור ראשון, רמה 2 = שני, וכו'
  buttons[level - 1].classList.add("active");
}


function startGame(level) {

    setActiveLevel(level);

    currentLevel = level;
    matchedPairs = 0;
    lockBoard = false;
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

document.addEventListener("DOMContentLoaded", () => {
  startGame(1);
});

function createCard(icon) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.dataset.cardId = icon;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-back">
                <img class="card-img" src="../img/memory_cards/front.png" alt="memory card back">
            </div>
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

    if (isMatch) {
        matchedPairs++;
        const totalPairs = levels[currentLevel] / 2; //number of pairs in current level
        resetBoard();

        if(matchedPairs === totalPairs) {
            finishGame(); // סיום משחק
        }
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

function finishGame() {
  const username = Storage.getCurrentUser();
  if (!username) return;

  const points = levelPoints[currentLevel] || 0;
  const total = Storage.addScore(username, points, "Memory Match");

  const msg = `
    ${username},
    סיימת רמה ${currentLevel} 🎮

    קיבלת ${points} נקודות ⭐
    סה״כ נקודות: ${total}
    `;

  document.getElementById("finish-message").textContent = msg;
  document.getElementById("game-finish-modal").classList.remove("hidden");
}

function closeFinishModal() {
  document.getElementById("game-finish-modal").classList.add("hidden");
}


