import CONST from '../utils/CONST.js';

export const search = {
  namespaced: true,
  state: CONST.search.getDefaultState(),
  getters: {
    resultPage(state) {
      const startIndex = state.pageIndex * state.resultByPage;
      return state.results.slice(startIndex, startIndex + state.resultByPage);
    },
  },
  mutations: {
    previousPage(state) {
      state.pageIndex = Math.max(0, state.pageIndex - 1);
    },
    nextPage(state) {
      state.pageIndex = Math.min(state.pageIndex + 1);
    },
    clearSearch(state) {
      Object.assign(state, CONST.search.getDefaultState());
    },
    removeText(state, index) {
      const newTexts = [...state.texts];
      newTexts.splice(index, 1);
      state.texts = newTexts;
    },
    addText(state, _text) {
      const text = _text.trim();
      if (!text || state.texts.includes(text)) {
        return;
      }
      state.texts = [...state.texts, text];
    },
    removeType(state, index) {
      const newTypes = [...state.types];
      newTypes.splice(index, 1);
      state.types = newTypes;
    },
    addType(state, _type) {
      const type = _type.trim();
      if (!type || state.types.includes(type)) {
        return;
      }
      state.types = [...state.types, type];
    },
    setResults(state, results) {
      state.pageIndex = 0;
      state.pageCount = Math.round(results.length / state.resultByPage);
      state.results = [...results];
    },
  },
};
