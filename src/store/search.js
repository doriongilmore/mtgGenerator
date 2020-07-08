const BLANK_STRING = '';
const EXACT_KEY = ':';
const BLANK_ARRAY = [];

export const search = {
  namespaced: true,
  state: {
    exact: false,
    name: BLANK_STRING,
    lang: 'en',
    texts: [...BLANK_ARRAY],
    colorInclusion: EXACT_KEY,
    colors: [...BLANK_ARRAY],
    cmcInclusion: EXACT_KEY,
    cmc: BLANK_STRING,
    rarityInclusion: EXACT_KEY,
    rarity: BLANK_STRING,
    typeInclusion: EXACT_KEY,
    types: [...BLANK_ARRAY],
    results: [...BLANK_ARRAY],
  },
  mutations: {
    clearSearch(state) {
        state.name = BLANK_STRING;
        state.lang = 'en';
        state.texts = [...BLANK_ARRAY];
        state.colorInclusion = EXACT_KEY;
        state.colors = [...BLANK_ARRAY];
        state.cmcInclusion = EXACT_KEY;
        state.cmc = BLANK_STRING;
        state.rarityInclusion = EXACT_KEY;
        state.rarity = BLANK_STRING;
        state.typeInclusion = EXACT_KEY;
        state.types = [...BLANK_ARRAY];
        state.results = [...BLANK_ARRAY];
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
