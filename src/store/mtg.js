import APIMtg from 'src/http/mtg';
const scryfall = require('scryfall-sdk');
const Pool = require('src/utils/Pool');

// https://scryfall.com/docs/api/ Rate Limits and Good Citizenship
const MIN_DELAY = 100;

export const mtg = {
  namespaced: true,
  state: {
    cardsByIds: {},
    lastCall: Date.now() - MIN_DELAY,
    actualCall: null,
    pool: new Pool(MIN_DELAY),
  },
  mutations: {
    setCards(state, cards) {
      const newCardsByIds = {...state.cardsByIds};
      for (let i = 0, l = cards.length; i < l; i++) {
        const card = cards[i];
        if (!newCardsByIds[card.id]) {
          newCardsByIds[card.id] = card;
        }
      }
      state.cardsByIds = newCardsByIds;
    },
  },
  actions: {
    async search({ dispatch, commit, state }, args) {
      return new Promise((resolve, reject) => {
        if (!args.name) {
          reject('not implemented');
        }
        // const promise = scryfall.Cards.autoCompleteName.bind(scryfall.Cards, args.name);
        const promise = scryfall.Cards.byName.bind(scryfall.Cards, args.name);
        const callback = (result) => {
          commit('setCards', [result]);
          const promise = fetch.bind(null, result.prints_search_uri);
          const callback = response => response.json().then((res) => {
            commit('setCards', res.data);
            resolve(res.data);
          }).catch((e) => {
            reject(e);
          });
          state.pool.addToPool(promise, callback);
        };
        state.pool.addToPool(promise, callback);
      });
    },
  }
};
