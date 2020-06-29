const scryfall = require('scryfall-sdk');
const Pool = require('src/utils/Pool');

// https://scryfall.com/docs/api/ Rate Limits and Good Citizenship
const MIN_DELAY = 100;

/**
 *
 * @typedef Card
 * @property {string} id
 * @property {string} name
 * @property {string} cmc
 * @property {string} oracle_id
 * @property {string} oracle_text
 * @property {string} rarity
 * @property {string} rulings_uri
 * @property {string} mana_cost
 * @property {string} image_uri
 * @property {string} set
 * @property {string} set_name
 * @property {string} type_line
 * @property {Array} color_identity
 * @property {Array} legalities
 *
 * @property {Number} deckQte - doesnt exist during search
 * @property {string} printConfig - doesnt exist during search
 */
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
    async fetch({ dispatch, commit, state }, uri) {
      return new Promise((resolve) => {
        const promise = fetch.bind(window, uri);
        const callBack = response => response.json().then(json => resolve(json.data));
        state.pool.addToPool(promise, callBack);
      })
    },
    async search({ dispatch, commit, state }, args) {
      // todo check what can be added to query
      //  see https://scryfall.com/docs/syntax
      let query = 'cards/search?lang=any&unique=prints';
      const addToQuery = (key, value) => {
        query += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
      if (args.name) {
        const value = args.exact ? `!"${args.name}"` : args.name;
        addToQuery('q', value);
      }
      if (args.set) { addToQuery('set', args.name) }
      return new Promise((resolve, reject) => {
        if (!args.name) { reject('not implemented') }
        const promise = scryfall.Cards.query.bind(scryfall.Cards, query);
        const callback = (result) => {
          const cards = result.data.map(c => {
            return {
              id: c.id,
              name: c.name,
              cmc: c.cmc,
              legalities: c.legalities,
              oracle_id: c.oracle_id,
              oracle_text: c.oracle_text,
              rarity: c.rarity,
              rulings_uri: c.rulings_uri,
              mana_cost: c.mana_cost,
              color_identity: c.color_identity,
              image_uri: c.image_uris.large || c.image_uris.normal,
              set: c.set,
              set_name: c.set_name,
              type_line: c.type_line
            }
          })
          commit('setCards', cards);
          resolve(cards);
        };
        state.pool.addToPool(promise, callback);
      });
    },
  }
};
