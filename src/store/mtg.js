import DeckFactory from "src/utils/DeckFactory";
import { Cards } from "scryfall-sdk";

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
      const path = uri.replace('https://api.scryfall.com/', '');
      return Cards.query(path).then((res) => {
        return res.data;
      });
    },
    async search({ dispatch, commit, state }, args) {
      const options = { unique: "prints" };
      // todo check what can be added to query
      //  see https://scryfall.com/docs/syntax
      let query = 'lang:any';
      const addToQuery = (key, value) => {
        query += ` ${key}:"${value}"`
      }
      if (args.name) {
        const value = args.exact ? `!"${args.name}"` : args.name;
        addToQuery('name', value);
      }
      if (args.set) { addToQuery('set', args.set) }
      const results = [];
      return new Promise((resolve, reject) => {
        Cards.search(query, options).on("data", (c) => {
          // console.info(`complete ${c.name}`, c)
          results.push(DeckFactory.simplifyCard(c));
        }).on("end", () => {
          resolve(results);
        });
      });

    },
  }
};
