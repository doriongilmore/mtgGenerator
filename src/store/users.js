import { APIUsers } from "src/http/users";

export const users = {
  namespaced: true,
  state: {
    userIds: [],
    usersById: {}
  },
  mutations: {
    setUsers(state, usersData) {
      const ids = [...state.userIds];
      const users = { ...state.usersById };

      for (const user of usersData) {
        if (!ids.includes(user.id)) ids.push(user.id);
        users[user.id] = user;
      }

      state.userIds = ids;
      state.usersById = users;
    },
    removeUser(state, userId) {
      state.userIds = state.userIds.filter(id => id !== userId);

      const users = { ...state.usersById };
      delete users[userId];

      state.usersById = users;
    }
  },
  actions: {
    async loadAll({ commit, state }) {
      try {
        const users = await APIUsers.getUsersList();
        commit("setUsers", users);
      } catch (e) {
        console.error(e);
      }
    },
    async updateOne({ commit, state }, userData) {
      try {
        const updatedUser = userData.id
          ? await APIUsers.editUser(userData.id, userData)
          : await APIUsers.createUser(userData);
        commit("setUsers", [updatedUser]);
      } catch (e) {
        console.error(e);
      }
    },
    async deleteOne({ commit, state }, userId) {
      try {
        await APIUsers.deleteUser(userId);
        commit("removeUser", userId);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
