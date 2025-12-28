const Storage = {
  getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
  },

  saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  },

  findUser(username) {
    const users = this.getUsers();
    return users.find(u => u.username === username);
  },
  
  setCurrentUser(username) {
    localStorage.setItem("currentUser", username);
  },

  getCurrentUser() {
    return localStorage.getItem("currentUser");
  },
  
  addScore(username, points, gameName = "") {
    const users = this.getUsers();
    const user = users.find(u => u.username === username);
    if (!user) return null;

    user.score = (user.score || 0) + points;
    
    if (gameName) {
      if (!user.activities) user.activities = [];

      const activity = user.activities.find(a => a.title === gameName);

      if (activity) {
          activity.points += points;
      } else {
          user.activities.push({ title: gameName, points });
      }
    }
    
    this.saveUsers(users);

    const event = new CustomEvent('dataUpdated');
    window.dispatchEvent(event);

    return user.score;
  },
  
  findBestPlayers(topN = 3) {
    const users = this.getUsers();
    return users
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, topN);
  }
};
