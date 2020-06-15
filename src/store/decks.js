import { CONST } from 'src/utils/CONST';
import DeckFactory from "src/utils/DeckFactory";

export const decks = {
    namespaced: true,
    state: {
        decksByIds: {},
        tmpDeck: {},
    },
    mutations: {
        deleteDeck(state, deck) {
            const newDecksByIds = {...state.decksByIds};
            if (!newDecksByIds[deck.id]) { return }
            delete newDecksByIds[deck.id];
            state.decksByIds = newDecksByIds;
            window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
        },
        setDecks(state, decks) {
            const newDecksByIds = {...state.decksByIds};
            for (let i = 0, l = decks.length; i < l; i++) {
                const deck = decks[i];
                // if (!newDecksByIds[deck.id]) {
                newDecksByIds[deck.id] = deck;
                // }
            }
            state.decksByIds = newDecksByIds;
            window.localStorage.setItem(CONST.storageKeys.deckList, JSON.stringify(newDecksByIds));
        },
        setTmpDeck(state, deck) {
            state.tmpDeck = deck;
            window.localStorage.setItem(CONST.storageKeys.tmpDeck, JSON.stringify(deck));
        },
    },
    actions: {
        getDecks({ commit, state }) {
            if (!Object.keys(state.decksByIds).length) {
                const deckList = JSON.parse(window.localStorage.getItem(CONST.storageKeys.deckList)) || [];
                const cards = DeckFactory.getCards(deckList);
                commit('mtg/setCards', cards, { root: true });
                commit('setDecks', Object.values(deckList));
                return deckList;
            }
            return Object.values(state.decksByIds);
        },
        getTmpDeck({ dispatch, commit, state }) {
            const storageTmpDeck = JSON.parse(window.localStorage.getItem(CONST.storageKeys.tmpDeck));
            const newTmpDeck = DeckFactory.getDeckToCreate();
            const tmpDeck = DeckFactory.areSameDeck(storageTmpDeck, newTmpDeck)
                ? newTmpDeck
                :storageTmpDeck;
            const cards = DeckFactory.getCards([tmpDeck]);
            commit('mtg/setCards', cards, { root: true });
            commit('setTmpDeck', tmpDeck);
            return tmpDeck;
        },
    }
};
