export const useCounterStore = defineStore("counter", {
  state: () => ({
    users: [],
  }),
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    addUser(user) {
      this.users.push(user);
    },
    getUsers() {
      return this.users;
    },
    deleteUser(name) {
      this.users = this.users.filter((user) => user.name !== name);
    },
    updateSelection(name, selected) {
      const user = this.users.find((user) => user.name === name);
      if (user) {
        user.selected = selected;
      }
    },
    getPlayers() {
      return this.users.filter((user) => user.selected);
    },
    resetPlayers() {
      this.users.forEach((user) => {
        user.selected = false;
      });
    },
    updateScore(player) {
      const user = this.users.find((user) => user.name === player.name);
      if (user) {
        user.result = player.result;
      }
    },
  },
});
