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
    allDecksLost:
      'All you decks will be lost permanently and the "Classic List" will return to it\'s default state.' +
      ' This can resolve some issues due to bad retro-compatibility during version update (probably of this site) ',
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
  },
};

export default modals;
