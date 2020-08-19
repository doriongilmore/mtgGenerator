import CONST from '../utils/CONST.js';

function getDefaultState() {
  return {
    global: {
      favoriteLanguage: CONST.search.lang.en.key,
    },
    deck: {
      typeGrouping: true,
      typePriority: [...CONST.sorting.defaultTypePriority],
      sorting: [...CONST.sorting.defaultSortPriority],
    },
    byDeck: {},
  };
}
function updateDeckSetting(state, deck, key, value) {
  const target = deck ? 'byDeck' : 'deck';
  const newValues = { ...state[target] };
  if (deck) {
    if (!newValues[deck.id]) {
      newValues[deck.id] = {};
    }
    newValues[deck.id][key] = value;
  } else {
    newValues[key] = value;
  }
  state[target] = newValues;
  window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
}

export const settings = {
  namespaced: true,
  state: JSON.parse(window.localStorage.getItem(CONST.storageKeys.settings)) || getDefaultState(),
  mutations: {
    setTypeGrouping(state, { value, deck = null }) {
      updateDeckSetting(state, deck, CONST.settings.keys.typeGrouping.key, !!value);
    },
    setTypePriority(state, { value, deck = null }) {
      updateDeckSetting(state, deck, CONST.settings.keys.typePriority.key, [...value]);
    },
    setSorting(state, { value, deck = null }) {
      updateDeckSetting(state, deck, CONST.settings.keys.sorting.key, [...value]);
    },

    reset(state, { setting, deck = null }) {
      const defaultState = getDefaultState();
      const resetSpecific = !!setting;
      if (deck) {
        const newByDeck = { ...state.byDeck };
        if (resetSpecific) {
          if (newByDeck[deck.id][setting.key] !== undefined) {
            delete newByDeck[deck.id][setting.key];
          }
        } else {
          newByDeck[deck.id] = {};
        }
        state.byDeck = newByDeck;
      } else if (resetSpecific) {
        const parent = setting.global ? CONST.settings.keys.global : CONST.settings.keys.deck;
        const newKey = { ...state[parent] };
        newKey[setting.key] = defaultState[parent][setting.key];
        state[parent] = newKey;
      } else {
        Object.assign(state, defaultState);
      }
      window.localStorage.setItem(CONST.storageKeys.settings, JSON.stringify(state));
    },
  },
};
