import CONST from '../utils/CONST';

// we don't want this to be exposed in the mixin
function openModal(mixinThis, event, data) {
  return new Promise((resolve, reject) => {
    mixinThis.$root.$once(event.resolve, async res => {
      mixinThis.$root.$off(event.reject); // unsubscribe from error event
      resolve(res);
    });

    mixinThis.$root.$once(event.reject, err => {
      mixinThis.$root.$off(event.resolve); // unsubscribe from success event
      reject(err);
    });
    mixinThis.$root.$emit(event.open, data);
  });
}

/**
 * some modals don't need to handle unexpected closing
 * @returns {Promise<void>}
 */
const ignoreError = () => {};

export default {
  methods: {
    /**
     * @param {String} message - defaults to 'Are you sure?'
     * @returns {Promise<void>}
     */
    confirmModal(message) {
      return openModal(this, CONST.modals.events.confirmation, message);
    },
    /**
     * @param {Deck|DeckList} deckOrList
     * @returns {Promise<void>}
     */
    exportModal(deckOrList) {
      return openModal(this, CONST.modals.events.export, deckOrList).catch(ignoreError);
    },
    /**
     * @returns {Promise<Deck|DeckList>}
     */
    importModal() {
      return openModal(this, CONST.modals.events.import);
    },
    /**
     * @param {String} cardId
     * @returns {Promise<void>}
     */
    cardModal(cardId) {
      return openModal(this, CONST.modals.events.card, cardId).catch(ignoreError);
    },
    searchModal() {
      return openModal(this, CONST.modals.events.search).catch(ignoreError);
    },
  },
};
