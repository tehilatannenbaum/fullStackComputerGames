const allQuestions = [
  { q: "מהי בירת צרפת?", options: ["לונדון", "פריז", "רומא", "מדריד"], a: "פריז" },
  { q: "כמה יבשות יש בעולם?", options: ["5", "6", "7", "8"], a: "7" },
  { q: "מי כתב את 'הארי פוטר'?", options: ["טולקין", "רולינג", "לואיס", "קינג"], a: "רולינג" },
  { q: "מהו הכוכב הקרוב ביותר לשמש?", options: ["נוגה", "מאדים", "כדור הארץ", "חמה"], a: "חמה" },
  { q: "באיזו מדינה נמצאת הפירמידה הגדולה?", options: ["יוון", "מקסיקו", "מצרים", "סין"], a: "מצרים" },
  { q: "כמה שחקנים יש בקבוצת כדורגל על המגרש?", options: ["9", "10", "11", "12"], a: "11" },
  { q: "מהו הים הגדול בעולם?", options: ["ים סוף", "ים תיכון", "האוקיינוס האטלנטי", "האוקיינוס השקט"], a: "האוקיינוס השקט" },
  { q: "מי היה ראש הממשלה הראשון של ישראל?", options: ["בן גוריון", "רבין", "בגין", "אשכול"], a: "בן גוריון" },
  { q: "מהי השפה המדוברת ביותר בעולם?", options: ["אנגלית", "ספרדית", "סינית", "ערבית"], a: "סינית" },
  { q: "איזה בעל חיים הוא היונק הגדול ביותר?", options: ["פיל", "לווייתן כחול", "כריש", "היפופוטם"], a: "לווייתן כחול" },
  { q: "כמה דקות יש בשעה?", options: ["30", "45", "60", "90"], a: "60" },
  { q: "מהו ההר הגבוה בעולם?", options: ["קילימנג'רו", "אוורסט", "אלפים", "חרמון"], a: "אוורסט" },
  { q: "לאיזו מדינת מוצא שייכת הפיצה?", options: ["צרפת", "ארה\"ב", "איטליה", "ספרד"], a: "איטליה" },
  { q: "מהו האיבר הגדול ביותר בגוף האדם?", options: ["לב", "כבד", "עור", "ריאות"], a: "עור" },
  { q: "כמה צבעים יש בקשת?", options: ["5", "6", "7", "8"], a: "7" },
  { q: "איזו חיה נחשבת למלך החיות?", options: ["נמר", "אריה", "פיל", "דוב"], a: "אריה" },
  { q: "מהי בירת ישראל?", options: ["תל אביב", "חיפה", "ירושלים", "באר שבע"], a: "ירושלים" },
  { q: "באיזו שנה הוקמה מדינת ישראל?", options: ["1945", "1947", "1948", "1950"], a: "1948" },
  { q: "איזה כלי נגינה יש לו קלידים?", options: ["גיטרה", "כינור", "פסנתר", "תוף"], a: "פסנתר" },
  { q: "מהו החומר הקשה ביותר בטבע?", options: ["ברזל", "זהב", "יהלום", "כסף"], a: "יהלום" }
];

let gameQuestions = []; // the questions for the current game session
let currentQuestionIndex = 0;
let score = 0;

const eggElement = document.getElementById('egg-img');
const progressBar = document.getElementById('progress-bar');

/** Prepare the game by selecting a six random subset of questions */
function prepareGame() {
    currentQuestionIndex = 0;
    score = 0;
    eggElement.src = '../img/crash_egg/egg_1.png';
    progressBar.style.width = '0%';
    gameQuestions = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
}

function loadQuestion() {
    const qData = gameQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = qData.q;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    // mixing the options order
    const shuffledOptions = [...qData.options]
        .sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((opt) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, qData.a); 
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
        updateEgg();
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < gameQuestions.length) {
        loadQuestion();
    } else {
        finishGame();
    }
}

function updateEgg() {
    const progress = (score / gameQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;

    const stage = Math.min(score + 1, 6);//לייתר בטחון
    eggElement.src = `../img/crash_egg/egg_${stage}.png`;
    eggElement.classList.add('crack-animation');
        setTimeout(() => {
            eggElement.classList.remove('crack-animation');
        }, 500);
}

function finishGame() {
  const username = Storage.getCurrentUser();
  if (!username) return;

  let points = 0;
  let statusMsg = "";

  if (score === gameQuestions.length) {
    points = 100;
    statusMsg = "כל הכבוד! הצלחת! הביצה בקעה";
  } else if (score >= gameQuestions.length / 2) {
    points = 50;
    statusMsg = "היית קרוב/ה... אך הביצה לא בקעה ";
  } else {
    points = 10;
    statusMsg = "אוי לא, הביצה לא בקעה. נסה/י שוב!";
  }

  const total = Storage.addScore(username, points, "Crash the Egg");
  const msg = `
    ${username},
    ${statusMsg}

    קיבלת ${points} נקודות ⭐
    סה״כ נקודות: ${total}
    `;

  document.getElementById("finish-message").textContent = msg;
  document.getElementById("game-finish-modal").classList.remove("hidden");
}

function closeFinishModal() {
  document.getElementById("game-finish-modal").classList.add("hidden");
  prepareGame();
  loadQuestion();
}

prepareGame();
loadQuestion();