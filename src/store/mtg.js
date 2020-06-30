import DeckFactory from "src/utils/DeckFactory";
import { Cards } from "scryfall-sdk";

const basicQuery = 'lang:any';

function getQuery(args) {
  let query = basicQuery;

  const addToQuery = (key, value, comp = ':') => {
    query += ` ${key}${comp}${value}`
  }

  const name = args.name && args.exact && `!"${args.name}"` || args.name;
  if (name) { addToQuery('name', name) }

  const colors = (args.colors || []).join('');
  if (colors) { addToQuery('c', colors, args.colorInclusion) }

  if (args.set) { addToQuery('set', args.set) }

  if (args.rarity) { addToQuery('r', args.rarity, args.rarityInclusion) }

  for (let i = 0, l = (args.texts || []).length; i < l; i++) {
    addToQuery('o', `"${args.texts[i]}"`);
  }

  for (let i = 0, l = (args.types || []).length; i < l; i++) {
    addToQuery('t', args.types[i]);
  }

  return query;
}

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
 * @property {string[]} image_uris
 * @property {string} set
 * @property {string} set_name
 * @property {string} type_line
 * @property {string[]} color_identity
 * @property {Array<string[]>} legalities
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
      console.info('launch search', args);
      const options = { unique: "prints", page: 1 };
      const query = getQuery(args);
      const results = [];
      // return Cards.search(query, options).cancelAfterPage().waitForAll()
      return new Promise((resolve, reject) => {
        if (query === basicQuery) { resolve([]) }
        Cards.search(query, options).on("data", (c) => {
          results.push(DeckFactory.simplifyCard(c));
        }).on("end", () => {
          resolve(results);
        });
      }).then((res) => {
        console.info('results for search', { args, res });
        return res;
      });

    },
  }
};
