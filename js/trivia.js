const questions = [
    { q: "מהי בירת צרפת?", options: ["לונדון", "פריז", "רומא", "מדריד"], a: 1 },
    { q: "כמה זה 5 + 5?", options: ["10", "15", "20", "25"], a: 0 },
    { q: "איזו שפה משמשת לעיצוב אתרים?", options: ["HTML", "Python", "CSS", "Java"], a: 2 },
    { q: "מי המציא את נורת החשמל?", options: ["איינשטיין", "אדיסון", "טסלה", "ניוטון"], a: 1 }
];

let currentQuestionIndex = 0;
let score = 0;

const eggElement = document.getElementById('egg');
const progressBar = document.getElementById('progress-bar');

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

    // שלבי התנפצות הביצה
    if (progress > 25) eggElement.innerText = '🥚'; 
    if (progress > 50) {
        eggElement.innerText = '🐣';
        eggElement.classList.add('shaking');
    }
    if (progress > 75) eggElement.innerText = '🐥';
}

function showFinalSurprise() {
    document.getElementById('quiz-card').classList.add('hidden');
    document.getElementById('victory-screen').classList.remove('hidden');
    eggElement.innerText = '🐉'; // ההפתעה שיצאה מהביצה
    eggElement.classList.remove('shaking');
}

// התחלת המשחק
loadQuestion();