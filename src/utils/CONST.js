const DONT_PRINT = { key: -1, text: 'Ignorer' };
const BORDER_NONE = { key: 0, text: 'Pas de bordure' };
const BORDER_1 = { key: 1, text: 'Bordure 0.1mm' };
const BORDER_2 = { key: 2, text: 'Bordure 0.2mm' };
const BORDER_3 = { key: 3, text: 'Bordure 0.3mm' };

export const CONST = {
  modals: {
    sizeRatio: {
      small: {
        width: 0.2,
        height: 0.4
      },
      medium: {
        width: 0.4,
        height: 0.4
      },
      large: {
        width: 0.7,
        height: 0.7
      },
      fullscreen: {
        width: 0.9,
        height: 0.9
      }
    }
  },
  storageKeys: {
    deckList: 'deckList',
    tmpDeck: 'tmpDeck',
  },
  printConfig: {
    DONT_PRINT,
    BORDER_NONE,
    BORDER_1,
    BORDER_2,
    BORDER_3,
    list: [
      DONT_PRINT,
      BORDER_NONE,
      BORDER_1,
      BORDER_2,
      BORDER_3
    ],
  }
};
