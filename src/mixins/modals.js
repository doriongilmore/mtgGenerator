import CONST from '../utils/CONST';

// we don't want this to be exposed in the mixin
function openModal(mixinThis, event, data) {
  return new Promise((resolve, reject) => {
    mixinThis.$root.$once(event.resolve, async () => {
      mixinThis.$root.$off(event.reject); // unsubscribe from error event
      resolve();
    });

    mixinThis.$root.$once(event.reject, () => {
      mixinThis.$root.$off(event.resolve); // unsubscribe from success event
      reject();
    });
    mixinThis.$root.$emit(event.open, data);
  });
}

export default {
  methods: {
    /**
     * @param {String} message - defaults to 'Are you sure?'
     * @returns {Promise<void>}
     */
    confirmModal(message) {
      return openModal(this, CONST.modals.events.confirmation, message);
    },
  },
};
