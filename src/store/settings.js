import CONST from '../utils/CONST.js';

export const settings = {
  namespaced: true,
  state: {
    sorting: [...CONST.sorting.defaultPriority],
  },
  mutations: {
    setSorting(state, list) {
      state.sorting = [...list];
    },
  },
};
