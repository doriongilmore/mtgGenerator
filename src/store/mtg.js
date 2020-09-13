import CONST from 'src/utils/CONST.js';
import cardsMock from 'src/utils/mock/mtg';
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

function saveList(newCardsByIds) {
  const list = JSON.stringify(newCardsByIds);
  // console.info('save cards list in storage');
  // console.info(list);
  window.sessionStorage.setItem(CONST.storageKeys.cards, list);
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
    cardsByIds: cardsMock.cardsByIds,
  },
  mutations: {
    setCards(state, cards) {
      const newCardsByIds = { ...state.cardsByIds };
      for (let i = 0, l = cards.length; i < l; i++) {
        const card = cards[i];
        newCardsByIds[card.id] = card;
      }
      state.cardsByIds = newCardsByIds;
      saveList(newCardsByIds);
    },
  },
  actions: {
    async fetch({ dispatch, commit, state }, uri) {
      const path = uri.replace('https://api.scryfall.com/', '');
      return (await Cards.query(path)).data;
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
          return reject('wrong query');
        }
        Cards.search(query, options)
          .on('cancel', res => {
            console.info('totoEL cancel', res);
            reject('no result', res);
          })
          .on('not_found', res => {
            console.info('totoEL not_found', res);
            reject('no result', res);
          })
          .on('error', res => {
            console.info('totoEL error', res);
            reject('no result', res);
          })
          .on('data', c => {
            console.info('totoEL data', c);
            context.commit('setCards', [c]);
            context.commit('search/setResults', { results: [c.id], searchParams, finished: false }, { root: true });
            results.push(c.id);
          })
          .on('end', res => {
            console.info('totoEL end', res);
            context.commit('search/setResults', { results: [], searchParams, finished: true }, { root: true });
            resolve(results);
          })
          .on('done', res => {
            console.info('totoEL done', res);
            reject('no result', res);
          });
      }).then(res => {
        console.info('results for search', { searchParams, res });
        return res;
      });
    },
    async getCardById(context, { cardId, forceRefresh = false }) {
      let card;
      if (context.state.cardsByIds[cardId] && !forceRefresh) {
        card = context.state.cardsByIds[cardId];
        console.info(`card ${cardId} found in storage`, card);
      } else {
        try {
          card = await Cards.byId(cardId);
        } catch (e) {
          console.error('error fetching card', cardId, e);
          throw e;
        }

        try {
          const rulings = await context.dispatch('fetch', card.rulings_uri);
          card.rulings = rulings.map(r => `[${r.published_at}] ${r.comment}`);
        } catch (e) {
          console.error('error fetching rules for ', card.id, e);
          card.rulings = [];
        }

        context.commit('setCards', [card]);
        console.info(`card ${cardId} found with scryfall`, card);
      }
      return DeckFactory.simplifyCard(card);
    },
  },
};
