import mockList from 'src/utils/mockList';
import CONST from 'src/utils/CONST';
import DeckFactory from 'src/utils/DeckFactory';

/**
 * @typedef DeckList
 * @property {string} name
 * @property {Boolean} ignoreStat
 * @property {Array<Card>} list
 */
/**
 * @typedef Deck
 * @property {Number} id
 * @property {string} name
 * @property {string} colors
 * @property {string} cardCount
 * @property {Date} dateCreation
 * @property {Date} dateEdition
 * @property {Array<DeckList>} lists
 */

export const decks = {
  namespaced: true,
  state: {
    decksByIds: JSON.parse(window.localStorage.getItem(CONST.storageKeys.deckList) || mockList),
  },
  mutations: {
    deleteDeck(state, deck) {
      const newDecksByIds = { ...state.decksByIds };
      if (!newDecksByIds[deck.id]) {
        return;
      }
      delete newDecksByIds[deck.id];
      state.decksByIds = newDecksByIds;
      window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
    },
    setDecks(state, decks) {
      const newDecksByIds = { ...state.decksByIds };
      for (let i = 0, l = decks.length; i < l; i++) {
        const deck = decks[i];
        // if (!newDecksByIds[deck.id]) {
        newDecksByIds[deck.id] = deck;
        // }
      }
      state.decksByIds = newDecksByIds;
      window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
    },
    reset(state) {
      const deckList = JSON.parse(mockList);
      const newDecksByIds = { ...deckList };
      state.decksByIds = newDecksByIds;
      window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
      window.localStorage.removeItem(CONST.storageKeys.tmpDeck);
    },
    addCardToList(state, { card, deck, listIndex }) {
      const _card = DeckFactory.cloneCardForDeck(card);
      const _deck = deck || DeckFactory.getDeckToCreate();
      let _listIndex = 0;
      if (listIndex || listIndex === 0) {
        _listIndex = listIndex;
      } else if (deck) {
        _listIndex = deck.lists.length;
      }
      const newDecksByIds = { ...state.decksByIds };
      if (!_deck.lists[_listIndex]) {
        _deck.lists.push(DeckFactory.createNewList());
      }
      if (!_deck.lists[_listIndex].list.find(c => c.id === _card.id)) {
        _deck.lists[_listIndex].list.push(_card);
        DeckFactory.update(_deck);
        newDecksByIds[_deck.id] = _deck;
        state.decksByIds = newDecksByIds;
        window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
      }
    },
  },
  actions: {},
};
