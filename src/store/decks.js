import decksMock from 'src/utils/mock/decks';
const mockList = JSON.stringify(decksMock.decksByIds);
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

function saveList(newDecksByIds) {
  const list = JSON.stringify(newDecksByIds);
  // console.info('save deck list in storage');
  // console.info(list);
  window.localStorage.setItem(CONST.storageKeys.deckList, list);
}

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
      saveList(newDecksByIds);
    },
    setDecks(state, decks) {
      const newDecksByIds = { ...state.decksByIds };
      for (let i = 0, l = decks.length; i < l; i++) {
        const deck = decks[i];
        newDecksByIds[deck.id] = deck;
      }
      state.decksByIds = newDecksByIds;
      saveList(newDecksByIds);
    },
    reset(state) {
      const deckList = JSON.parse(mockList);
      const newDecksByIds = { ...deckList };
      state.decksByIds = newDecksByIds;
      saveList(newDecksByIds);
      for (let i = 0; i < CONST.storageKeys.notSupported.length; i++) {
        window.localStorage.removeItem(CONST.storageKeys.notSupported[i]);
      }
    },
  },
  actions: {
    addCardToList(context, { card, deck, listIndex }) {
      const cardsInfo = context.rootState.mtg.cardsByIds;
      const _card = DeckFactory.cloneCardForDeck(cardsInfo[card.id]);
      const _deck = deck || DeckFactory.getDeckToCreate();
      let _listIndex = 0;
      if (listIndex || listIndex === 0) {
        _listIndex = listIndex;
      } else if (deck) {
        _listIndex = deck.lists.length;
      }
      if (!_deck.lists[_listIndex]) {
        _deck.lists.push(DeckFactory.createNewList());
      }
      if (!_deck.lists[_listIndex].list.find(c => c.id === _card.id)) {
        _deck.lists[_listIndex].list.push(_card);
        DeckFactory.update(_deck, cardsInfo);
        context.commit('setDecks', [_deck]);
      }
    },
  },
};
