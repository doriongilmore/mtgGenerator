import CONST from '../utils/CONST';

const oldState = JSON.parse(window.localStorage.getItem(CONST.storageKeys.tutorial)) || {};
function saveList(state) {
  window.localStorage.setItem(CONST.storageKeys.tutorial, JSON.stringify(state));
}

export const tutorial = {
  namespaced: true,
  state: {
    home: !!oldState.home,
    editionHeader: !!oldState.editionHeader,
    searchLanguage: !!oldState.searchLanguage,
    advancedSearch: !!oldState.advancedSearch,
    settingsLists: !!oldState.settingsLists,
    print: !!oldState.print,
  },
  mutations: {
    homeUnderstood(state) {
      state.home = true;
      saveList(state);
    },
    editionHeaderUnderstood(state) {
      state.editionHeader = true;
      saveList(state);
    },
    searchLanguageUnderstood(state) {
      state.searchLanguage = true;
      saveList(state);
    },
    advancedSearchUnderstood(state) {
      state.advancedSearch = true;
      saveList(state);
    },
    settingsListsUnderstood(state) {
      state.settingsLists = true;
      saveList(state);
    },
    printUnderstood(state) {
      state.print = true;
      saveList(state);
    },
  },
};
