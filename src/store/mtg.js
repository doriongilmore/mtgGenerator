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
  window.sessionStorage.setItem(CONST.storageKeys.cards, list);
}

function initData(context, card) {
  if (!card.__legalities) {
    const legalities = Object.entries(card.legalities)
      .map(([format, legal]) => ({ format, legal }))
      .filter(l => l.legal === 'legal' || l.legal === 'restricted');
    card.__legalities = card.legalities;
    card.legalities = legalities;
  }
  if (!card.rulings && !card.getRulingsPromise) {
    card.getRulingsPromise = () =>
      context.dispatch('fetchRulings', { card }).then(() => context.commit('setCards', [card]));
  }
}

const RETRY_TIMEOUT = 2000;
const MAX_RETRIES = 5;
const notUrgent = {
  freeze: false,
  _list: [],
  retryCount: 0,
  run() {
    const promise = notUrgent._list[0];
    if (!promise || notUrgent.freeze) {
      if (notUrgent.retryCount < MAX_RETRIES) {
        notUrgent.retryCount += 1;
        setTimeout(notUrgent.run.bind(notUrgent), RETRY_TIMEOUT);
      }
    } else {
      notUrgent.retryCount = 0;
      notUrgent._list.shift();
      promise().then(notUrgent.run.bind(notUrgent));
    }
  },
  push(promise) {
    notUrgent._list.push(promise);
  },
};
notUrgent.run();

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
    cardsPromiseByIds: {},
    preload: true,
    preloadingCards: true,
    preloadingRulings: false,
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
    setPromise(state, { cardId, promise }) {
      const newCardsPromiseByIds = { ...state.cardsPromiseByIds };
      newCardsPromiseByIds[cardId] = promise;
      state.cardsPromiseByIds = newCardsPromiseByIds;
    },
    preloadCardsFinished(state) {
      state.preloadingCards = false;
    },
    preloadRulingsStarted(state) {
      state.preloadingRulings = true;
    },
    preloadRulingsFinished(state) {
      state.preloadingRulings = false;
    },
  },
  actions: {
    async fetch({ dispatch, commit, state }, uri) {
      notUrgent.freeze = true;
      const path = uri.replace('https://api.scryfall.com/', '');
      const res = (await Cards.query(path)).data;
      notUrgent.freeze = false;
      return res;
    },
    search(context, searchParams) {
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
        notUrgent.freeze = true;
        Cards.search(query, options)
          .on('cancel', res => {
            reject('no result', res);
          })
          .on('not_found', res => {
            reject('no result', res);
          })
          .on('error', res => {
            reject('no result', res);
          })
          .on('data', c => {
            context.commit('setCards', [c]);
            context.commit('search/setResults', { results: [c.id], searchParams, finished: false }, { root: true });
            results.push(c.id);
          })
          .on('end', res => {
            notUrgent.freeze = false;
            context.commit('search/setResults', { results: [], searchParams, finished: true }, { root: true });
            resolve(results);
          });
      }).then(res => {
        return res;
      });
    },
    async fetchRulings(context, { card }) {
      try {
        const rulings = await context.dispatch('fetch', card.rulings_uri);
        card.rulings = rulings.map(r => `[${r.published_at}] ${r.comment}`);
      } catch (e) {
        console.error('error fetching rules for ', card.id, e);
        card.rulings = [];
      }
    },
    async getCardById(context, { cardId, forceRefresh = false }) {
      let promise = context.state.cardsPromiseByIds[cardId];

      if (!promise) {
        promise = new Promise(async (resolve, reject) => {
          let card;
          if (context.state.cardsByIds[cardId] && !forceRefresh) {
            card = context.state.cardsByIds[cardId];
            initData(context, card);
          } else {
            try {
              notUrgent.freeze = true;
              card = await Cards.byId(cardId);
              notUrgent.freeze = false;
              initData(context, card);
            } catch (e) {
              console.error('error fetching card', cardId, e);
              reject(e);
            }
            context.commit('setCards', [card]);
          }
          resolve(DeckFactory.simplifyCard(card));
        });
        context.commit('setPromise', { cardId, promise });
      }

      return promise;
    },
    searchIdsInBackground(context, { cardIds }) {
      if (!cardIds.length) {
        return context.commit('preloadCardsFinished');
      }
      let shouldTransition = true;
      const transition = () => {
        shouldTransition && context.commit('preloadCardsFinished');
        shouldTransition && context.commit('preloadRulingsStarted');
        shouldTransition = false;
      };
      const getNopPromise = () => Promise.resolve();
      const getFinalCb = index =>
        async function promise() {
          return index !== cardIds.length - 1 ? getNopPromise() : context.commit('preloadRulingsFinished');
        };
      const getRulingsPromise = (p, index) =>
        function rulingsPromise() {
          transition();
          return p().then(getFinalCb(index));
        };
      const getPromise = index =>
        function promise() {
          return context.dispatch('getCardById', { cardId: cardIds[index] }).then(c => {
            notUrgent.push(getRulingsPromise(c.getRulingsPromise || getNopPromise, index));
          });
        };
      for (let i = 0, l = cardIds.length; i < l; i++) {
        notUrgent.push(getPromise(i));
      }
    },
  },
};
