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
  addScore(username, points) {
  const users = this.getUsers();
  const user = users.find(u => u.username === username);
  if (!user) return null;

  user.score = (user.score || 0) + points;
  this.saveUsers(users);
  return user.score; // מחזיר את הסכום החדש
},
getCurrentUser() {
  return localStorage.getItem("currentUser");
}
};
