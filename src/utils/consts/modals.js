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
  },
  events: {
    vue: {
      beforeShow: 'bv::modal::show',
      afterShow: 'bv::modal::shown',
      beforeHide: 'bv::modal::hide',
      afterHide: 'bv::modal::hidden',
    },
    confirmation: {
      open: 'modal/confirmation/open',
      resolve: 'modal/confirmation/ok',
      reject: 'modal/confirmation/cancel',
    },
  },
};

export default modals;
