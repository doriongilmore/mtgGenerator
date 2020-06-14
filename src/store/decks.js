import { CONST } from 'src/utils/CONST';
import DeckFactory from "src/utils/DeckFactory";

export const decks = {
    namespaced: true,
    state: {
        decksByIds: {},
        tmpDeck: {},
    },
    mutations: {
        setDecks(state, decks) {
            const newDecksByIds = {...state.decksByIds};
            for (let i = 0, l = decks.length; i < l; i++) {
                const card = decks[i];
                if (!newDecksByIds[card.id]) {
                    newDecksByIds[card.id] = card;
                }
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
                commit('setDecks', deckList);
                return deckList;
            }
            return Object.values(state.decksByIds);
        },
        getTmpDeck({ dispatch, commit, state }) {
            const tmpDeck = JSON.parse(window.localStorage.getItem(CONST.storageKeys.tmpDeck))
                || DeckFactory.getDeckToCreate();
            const cards = DeckFactory.getCards([tmpDeck]);
            commit('mtg/setCards', cards, { root: true });
            commit('setTmpDeck', tmpDeck);
            return tmpDeck;
        },
    }
};
