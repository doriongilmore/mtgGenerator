import { APIUsers } from "src/http/users";

export const users = {
  namespaced: true,
  state: {
    userIds: [],
    usersById: {}
  },
  mutations: {
    setUsers(state, usersData) {

    },
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
  }
};
