import CONST from '../utils/CONST.js';

export const search = {
  namespaced: true,
  state: {
    ...CONST.search.getDefaultState(),
    resultsByHash: {},
  },
  getters: {
    searchResults(state, getters) {
      const hash = JSON.stringify(getters.searchParams);
      return (state.resultsByHash[hash] || { results: [] }).results;
    },
    pageCount(state, getters) {
      return 1 + Math.floor(getters.searchResults.length / state.resultByPage);
    },
    resultPage(state, getters) {
      const startIndex = state.pageIndex * state.resultByPage;
      return getters.searchResults.slice(startIndex, startIndex + state.resultByPage);
    },
    searchParams(state) {
      return {
        exact: state.exact,
        name: state.name,
        lang: state.lang,
        texts: state.texts,
        colorInclusion: state.colorInclusion,
        colors: state.colors,
        cmcInclusion: state.cmcInclusion,
        cmc: state.cmc,
        rarityInclusion: state.rarityInclusion,
        rarity: state.rarity,
        typeInclusion: state.typeInclusion,
        types: state.types,
      };
    },
  },
  mutations: {
    setResults(state, { searchParams, results, finished }) {
      const newResultsByHash = { ...state.resultsByHash };
      const hash = JSON.stringify(searchParams);
      const oldResults = newResultsByHash[hash] ? newResultsByHash[hash].results : [];

      console.info('setResults', { hash, results, oldResults });

      const newResults = [...oldResults, ...results];
      newResultsByHash[hash] = {
        results: newResults,
        finished,
      };
      state.resultsByHash = newResultsByHash;
    },
    resetPageIndex(state) {
      state.pageIndex = 0;
    },
    previousPage(state) {
      state.pageIndex = Math.max(0, state.pageIndex - 1);
    },
    nextPage(state) {
      state.pageIndex = Math.min(state.pageIndex + 1);
    },
    defaultLanguageChanged(state, { oldLang, newLang }) {
      // don't break current search
      if (state.lang === oldLang) {
        state.lang = newLang;
      }
    },
    clearSearch(state, language) {
      Object.assign(state, CONST.search.getDefaultState(language));
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
  },
};
