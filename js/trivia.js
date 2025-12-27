const questions = [
    { q: "מהי בירת צרפת?", options: ["לונדון", "פריז", "רומא", "מדריד"], a: 1 },
    { q: "כמה זה 5 + 5?", options: ["10", "15", "20", "25"], a: 0 },
    { q: "איזו שפה משמשת לעיצוב אתרים?", options: ["HTML", "Python", "CSS", "Java"], a: 2 },
    { q: "מי המציא את נורת החשמל?", options: ["איינשטיין", "אדיסון", "טסלה", "ניוטון"], a: 1 },
    { q: "מי כתב את המחזה 'רומיאו ויוליה'?", options: ["שייקספיר", "מוצרט", "בטהובן", "דנטה"], a: 0 }
];

let currentQuestionIndex = 0;
let score = 0;

const eggElement = document.getElementById('egg-img');
const progressBar = document.getElementById('progress-bar');

const restartBtn = document.querySelector('.restart-btn');
restartBtn.addEventListener('click', () => {
    location.reload();
});

function loadQuestion() {
    const qData = questions[currentQuestionIndex];
    document.getElementById('question').innerText = qData.q;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentQuestionIndex].a) {
        score++;
        updateEgg();
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalSurprise();
    }
}

function updateEgg() {
    const progress = (score / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    const stage = Math.min(score + 1, 6);//לייתר בטחון
    eggElement.src = `../img/crash_egg/egg_${stage}.png`;
    eggElement.classList.add('crack-animation');
        setTimeout(() => {
            eggElement.classList.remove('crack-animation');
        }, 500);
}

function showFinalSurprise() {
    document.getElementsByClassName('game-area')[0].style.flex = '0 0 50%';
    document.getElementById('quiz-card').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';

    if (score === questions.length) {
        document.querySelector('.final-title').innerText = "הצלחת, הביצה בקעה!";
        document.querySelector('.final-message').innerText = "הרווחת 100 נקודות נוספות";
    } else if (score >= questions.length / 2) {
        document.querySelector('.final-title').innerText = "היית קרוב!";
        document.querySelector('.final-message').innerText = "הביצה כמעט בקעה - כדי להרוויח את כל הנקודות נסה שוב";
    }
    else {
        document.querySelector('.final-title').innerText = "נסה שוב!";
        document.querySelector('.final-message').innerText = "הביצה לא בקעה הפעם - לא להתייאש, שחק שוב";
    }
}

loadQuestion();