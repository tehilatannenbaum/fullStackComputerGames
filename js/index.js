document.addEventListener("DOMContentLoaded", () => {
    const data = Storage.findUser(Storage.getCurrentUser());

    if (!data) return;

    document.getElementById("user-name").textContent = data.username;

    document.getElementById("score").textContent = data.score.toLocaleString();

    const activitiesList = document.querySelector(".activities");
    activitiesList.innerHTML = "";

    data.activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = `${activity.title} - ${activity.points} נק'`;
        activitiesList.appendChild(li);
    });

    const bestPlayers = Storage.findBestPlayers(3);
    const leaderboardList = document.querySelector(".leaderboard-list");
    leaderboardList.innerHTML = "";
});

document.addEventListener("DOMContentLoaded", () => {
    updateUI();

    window.addEventListener('dataUpdated', updateUI);
});

function updateUI() {
    const currentUser = Storage.getCurrentUser();
    if (!currentUser) return;

    const userData = Storage.findUser(currentUser);
    
    if (userData) {
        document.getElementById("user-name").textContent = userData.username;
        document.getElementById("score").textContent = userData.score.toLocaleString();
        
        renderRecentActivities(userData.activities || []);
    }

    renderLeaderboard();
}

function renderRecentActivities(activities) {
    const activitiesList = document.getElementById("activities-list");
    activitiesList.innerHTML = "";

    const lastTwo = activities.slice(-2).reverse();

    if (lastTwo.length === 0) {
        activitiesList.innerHTML = "<li>אין פעילות עדיין</li>";
        return;
    }

    lastTwo.forEach(activity => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="game-name">${activity.title}</span>
            <span class="game-points">+${activity.points}pt</span>
        `;
        activitiesList.appendChild(li);
    });
}

function renderLeaderboard() {
    const bestPlayers = Storage.findBestPlayers(3);
    const leaderboardList = document.querySelector(".leaderboard-list");
    leaderboardList.innerHTML = "";

    const ranks = ['gold', 'silver', 'bronze'];

    bestPlayers.forEach((player, index) => {
        const rankClass = ranks[index] || '';
        
        const div = document.createElement("div");
        div.className = `leader-item ${rankClass}`;
        
        div.innerHTML = `
            <span class="rank">${index + 1}</span>
            <span class="name">${player.username}</span>
            <span class="pts">${player.score.toLocaleString()}</span>
        `;
        
        leaderboardList.appendChild(div);
    });
}

