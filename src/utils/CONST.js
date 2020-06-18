const DONT_PRINT = { key: 'DONT_PRINT', text: 'Ignorer', className: 'dontprint' };
const BORDER_0 = { key: 'BORDER_0', text: 'Bord 0 mm',   className: 'border0' };
const BORDER_1 = { key: 'BORDER_1', text: 'Bord 1 mm', className: 'border1' };
const BORDER_2 = { key: 'BORDER_2', text: 'Bord 2 mm', className: 'border2' };
const BORDER_3 = { key: 'BORDER_3', text: 'Bord 3 mm', className: 'border3' };

const PARENTHESIS = { key: 'PARENTHESIS', value: 'PARENTHESIS', label: '(Set)', getCardEdition: c => `(${c.set})` };
// const BRACKET = { key: 'BRACKET', value: 'BRACKET', label: '{Set}', getCardEdition: c => `{${c.set}}` };
const HOOK = { key: 'HOOK', value: 'HOOK', label: '[Set]', getCardEdition: c => `[${c.set}]` };

const ORDER_QTE = { key: 'deckQte', value: 'Qte' };
const ORDER_SET = { key: 'set', value: 'Set' };
const ORDER_NAME = { key: 'name', value: 'Nom de carte' };

const FORMAT_JSON = { key: 'json', value: 'JSON' };
const FORMAT_TEXT = { key: 'text', value: 'Texte' };

const DORION = { key: 'DORION', value: 'doriongilmore', format: FORMAT_JSON };
const UNTAP = {
  key: 'UNTAP',
  value: 'untap',
  format: FORMAT_TEXT,
  order: [ORDER_QTE, ORDER_NAME, ORDER_SET],
  set: PARENTHESIS
}
const MAGIC_CORP = {
  key: 'MAGIC_CORP',
  value: 'magiccorporation',
  format: FORMAT_TEXT,
  order: [ORDER_QTE, ORDER_SET, ORDER_NAME],
  set: HOOK
}
const CONST = {
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
    BORDER_0,
    BORDER_1,
    BORDER_2,
    BORDER_3,
    list: [
      DONT_PRINT,
      BORDER_0,
      BORDER_1,
      BORDER_2,
      BORDER_3
    ],
  },
  exportFormats: {
    FORMAT_JSON,
    FORMAT_TEXT,
    DORION,
    MAGIC_CORP,
    UNTAP,
    list: [DORION, MAGIC_CORP, UNTAP]
  }
};

export default CONST;
