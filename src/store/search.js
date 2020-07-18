import CONST from "../utils/CONST.js";

export const search = {
  namespaced: true,
  state: CONST.search.getDefaultState(),
  mutations: {
    clearSearch(state) {
        const newState = CONST.search.getDefaultState();
        state.exact = newState.exact;
        state.name = newState.name;
        state.lang = newState.lang;
        state.texts = newState.texts;
        state.colorInclusion = newState.colorInclusion;
        state.colors = newState.colors;
        state.cmcInclusion = newState.cmcInclusion;
        state.cmc = newState.cmc;
        state.rarityInclusion = newState.rarityInclusion;
        state.rarity = newState.rarity;
        state.typeInclusion = newState.typeInclusion;
        state.types = newState.types;
        state.results = newState.results;
    },
    removeText(state, index) {
      const newTexts = [...state.texts];
      newTexts.splice(index, 1);
      state.texts = newTexts;
    },
    addText(state, _text) {
      const text = _text.trim();
      if (!text || state.texts.includes(text)) { return }
      state.texts = [...state.texts, text];
    },
    removeType(state, index) {
      const newTypes = [...state.types];
        newTypes.splice(index, 1);
      state.types = newTypes;
    },
    addType(state, _type) {
      const type = _type.trim();
      if (!type || state.types.includes(type)) { return }
      state.types = [...state.types, type];
    },
    setResults(state, results) {
      state.results = [...results];
    },
  },
};
