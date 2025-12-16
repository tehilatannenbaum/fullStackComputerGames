// ----- Tabs -----
const tabLogin = document.getElementById("tab-login");
const tabRegister = document.getElementById("tab-register");
const panelLogin = document.getElementById("panel-login");
const panelRegister = document.getElementById("panel-register");

function showPanel(which){
  const login = which === "login";

  tabLogin.classList.toggle("active", login);
  tabRegister.classList.toggle("active", !login);

  panelLogin.classList.toggle("hidden", !login);
  panelRegister.classList.toggle("hidden", login);

  clearMessages();
}

tabLogin.addEventListener("click", () => showPanel("login"));
tabRegister.addEventListener("click", () => showPanel("register"));


// ----- Messages helpers -----
const loginErr = document.getElementById("login-error");
const loginOk = document.getElementById("login-success");
const regErr = document.getElementById("reg-error");
const regOk = document.getElementById("reg-success");

function clearMessages(){
  loginErr.textContent = "";
  loginOk.textContent = "";
  regErr.textContent = "";
  regOk.textContent = "";
}

// ----- Register -----
panelRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessages();

  const username = document.getElementById("reg-username").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (username.length < 2) return regErr.textContent = "שם משתמש חייב להיות לפחות 2 תווים.";
  if (password.length < 4) return regErr.textContent = "סיסמה חייבת להיות לפחות 4 תווים.";
  if (password !== confirm) return regErr.textContent = "הסיסמאות לא תואמות.";

  const users = Storage.getUsers();
  if (users.some(u => u.username === username)) {
    return regErr.textContent = "שם המשתמש כבר קיים.";
  }

  users.push({
    username,
    password,         // בפרויקט הזה זה מספיק (אין שרת)
    createdAt: new Date().toISOString(),
    failedAttempts: 0,
    blockedUntil: null,
    score: 0,
    gamesPlayed: []
  });

  Storage.saveUsers(users);
  regOk.textContent = "נרשמת בהצלחה! עכשיו אפשר להתחבר.";
  panelRegister.reset();

  // מעבר אוטומטי להתחברות אחרי רגע
  setTimeout(() => showPanel("login"), 700);
});

// ----- Login -----
panelLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  clearMessages();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const users = Storage.getUsers();
  const user = users.find(u => u.username === username);

  if (!user) return loginErr.textContent = "משתמש לא קיים.";

  if (user.blockedUntil && Date.now() < user.blockedUntil) {
    const seconds = Math.ceil((user.blockedUntil - Date.now()) / 1000);
    return loginErr.textContent = `המשתמש חסום. נסי שוב בעוד ${seconds} שניות.`;
  }

  if (user.password !== password) {
    user.failedAttempts = (user.failedAttempts || 0) + 1;

    if (user.failedAttempts >= 3) {
      user.blockedUntil = Date.now() + 60 * 1000; // חסימה לדקה
      user.failedAttempts = 0;
      Storage.saveUsers(users);
      return loginErr.textContent = "3 ניסיונות שגויים. המשתמש נחסם לדקה.";
    }

    Storage.saveUsers(users);
    return loginErr.textContent = `סיסמה שגויה. ניסיון ${user.failedAttempts}/3.`;
  }

  // success
  user.failedAttempts = 0;
  user.blockedUntil = null;
  Storage.saveUsers(users);

  Storage.setCurrentUser(username);
  loginOk.textContent = "התחברת בהצלחה!";

  // בהמשך: להפנות לעמוד האפליקציות שלכם
  // window.location.href = "../index.html";
});
