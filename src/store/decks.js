import { CONST } from 'src/utils/CONST';

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
            window.localStorage.setItem(CONST.storageKeys.deckList, newDecksByIds);
        },
        setTmpDeck(state, deck) {
            state.tmpDeck = deck;
            window.localStorage.setItem(CONST.storageKeys.tmpDeck, deck);
        },
    },
    actions: {
        getDeckToCreate({ dispatch, commit, state }, args) {

        },
    }
};
