import CONST from '../utils/CONST.js';

export const settings = {
  namespaced: true,
  state: {
    global: {},
    deck: {
      typeGrouping: true,
      typePriority: [...CONST.sorting.defaultTypePriority],
      sorting: [...CONST.sorting.defaultSortPriority],
    },
  },
  mutations: {
    setTypeGrouping(state, bool) {
      state.deck.typeGrouping = bool;
    },
    setTypePriority(state, list) {
      state.deck.typePriority = [...list];
    },
    setSorting(state, list) {
      state.deck.sorting = [...list];
    },
  },
};
