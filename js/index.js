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


