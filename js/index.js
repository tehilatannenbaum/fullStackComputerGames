localStorage.setItem("profileData", JSON.stringify({
    name: "ישראל ",
    totalScore: 1250,
    activities: [
        { title: "סופר מריו", points: 50 },
        { title: "שחמט אונליין", points: 20 }
    ]
}));


document.addEventListener("DOMContentLoaded", () => {
    const data = JSON.parse(localStorage.getItem("currentUser"));

    if (!data) return;

    document.querySelector(".user-stats p strong").parentElement.innerHTML =
        `<strong>שם:</strong> ${data}`;

    document.querySelector(".score").textContent = data.totalScore.toLocaleString();

    const activitiesList = document.querySelector(".activities");
    activitiesList.innerHTML = "";

    data.activities.forEach(activity => {
        const li = document.createElement("li");
        li.textContent = `${activity.title} - ${activity.points} נק'`;
        activitiesList.appendChild(li);
    });
});
