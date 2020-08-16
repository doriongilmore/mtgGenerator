import CONST from 'src/utils/CONST.js';
import DeckFactory from 'src/utils/DeckFactory';
import { Cards } from 'scryfall-sdk';

function getQuery(args) {
  let query = `lang:${args['lang'] || CONST.search.lang.any.key}`;

  const addToQuery = (key, value, comp = ':') => {
    query += ` ${key}${comp}${value}`;
  };

  const name = (args.name && args.exact && `!"${args.name}"`) || args.name;
  if (name) {
    addToQuery('', name, '');
  }

  const colors = (args.colors || []).join('');
  if (colors) {
    addToQuery('c', colors, args.colorInclusion);
  }

  if (args.cmc) {
    addToQuery('cmc', args.cmc, args.cmcInclusion);
  }

  if (args.set) {
    addToQuery('set', args.set);
  }

  if (args.rarity) {
    addToQuery('r', args.rarity, args.rarityInclusion);
  }

  for (let i = 0, l = (args.texts || []).length; i < l; i++) {
    addToQuery('o', `"${args.texts[i]}"`);
  }

  for (let i = 0, l = (args.types || []).length; i < l; i++) {
    addToQuery('t', args.types[i]);
  }

  return query;
}

function isCorrectQuery(args) {
  return (
    !CONST.search.lang[args.lang].shouldCheck ||
    args.name ||
    (args.colors && args.colors.length) ||
    args.cmc ||
    args.set ||
    args.rarity ||
    (args.texts && args.texts.length) ||
    (args.types && args.types.length)
  );
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
      const newCardsByIds = { ...state.cardsByIds };
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
      return Cards.query(path).then(res => {
        return res.data;
      });
    },
    search(context, searchParams) {
      console.info('launch search', searchParams, context);
      const options = { unique: 'prints', page: 1 };
      const query = isCorrectQuery(searchParams) ? getQuery(searchParams) : '';
      const results = [];
      return new Promise((resolve, reject) => {
        context.commit('search/resetPageIndex', null, { root: true });
        const hash = JSON.stringify(searchParams);
        if (context.rootState.search.resultsByHash[hash]) {
          return resolve(context.rootState.search.resultsByHash[hash].results);
        }
        if (!query) {
          return resolve([]);
        }
        Cards.search(query, options)
          .on('data', c => {
            const card = DeckFactory.simplifyCard(c);
            context.commit('search/setResults', { results: [card], searchParams, finished: false }, { root: true });
            results.push(card);
          })
          .on('end', () => {
            context.commit('search/setResults', { results: [], searchParams, finished: true }, { root: true });
            resolve(results);
          });
      }).then(res => {
        console.info('results for search', { searchParams, res });
        return res;
      });
    },
  },
};
