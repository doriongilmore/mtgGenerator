import CONST from '../utils/CONST.js';

function getDefaultState() {
  return {
    global: {},
    deck: {
      typeGrouping: true,
      typePriority: [...CONST.sorting.defaultTypePriority],
      sorting: [...CONST.sorting.defaultSortPriority],
    },
  };
}

export const settings = {
  namespaced: true,
  state: JSON.parse(window.localStorage.getItem(CONST.storageKeys.settings)) || getDefaultState(),
  mutations: {
    setTypeGrouping(state, bool) {
      state.deck.typeGrouping = bool;
      window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
    },
    setTypePriority(state, list) {
      state.deck.typePriority = [...list];
      window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
    },
    setSorting(state, list) {
      state.deck.sorting = [...list];
      window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
    },

    reset(state) {
      Object.assign(state, getDefaultState());
      window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
    },
  },
};
