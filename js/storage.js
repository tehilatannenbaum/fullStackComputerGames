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
  }
};
