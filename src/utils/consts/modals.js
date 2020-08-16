function getDefaultEvents(modalName) {
  return {
    open: `modal/${modalName}/open`,
    resolve: `modal/${modalName}/ok`,
    reject: `modal/${modalName}/cancel`,
  };
}

const modals = {
  sizeRatio: {
    small: {
      width: 0.2,
      height: 0.4,
    },
    medium: {
      width: 0.4,
      height: 0.4,
    },
    large: {
      width: 0.7,
      height: 0.7,
    },
    fullscreen: {
      width: 0.9,
      height: 0.9,
    },
  },
  closeReason: {
    clickOutside: 'backdrop',
    cancel: 'cancel',
    confirm: 'ok',
  },
  confirmationMessage: {
    deckLost: 'The deck will be lost permanently!',
    allDecksLost: 'All you decks will be lost permanently and the "Classic List" will return to it\'s default state.',
    allSettingsLost: 'All your settings will return to their default state.',
  },
  events: {
    vue: {
      beforeShow: 'bv::modal::show',
      afterShow: 'bv::modal::shown',
      beforeHide: 'bv::modal::hide',
      afterHide: 'bv::modal::hidden',
    },
    confirmation: getDefaultEvents('confirmation'),
    export: getDefaultEvents('export'),
    import: getDefaultEvents('import'),
    card: getDefaultEvents('card'),
    search: getDefaultEvents('search'),
  },
};

export default modals;
