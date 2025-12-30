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

      const index = user.activities.findIndex(a => a.title === gameName);

      if (index !== -1) {
        //update existing activity to be most recent
        const activity = user.activities.splice(index, 1)[0];
        activity.points += points;
        user.activities.unshift(activity);
      } else {
        //add new activity
        user.activities.unshift({ title: gameName, points });
      }
    }
    
    this.saveUsers(users);

    return user.score;
  },
  
  findBestPlayers(topN = 3) {
    const users = this.getUsers();
    return users
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, topN);
  }
};
