const DONT_PRINT = { key: 'DONT_PRINT', text: 'Ignorer' };
const BORDER_0 = { key: 'BORDER_0', text: 'Bord 0 mm', w: 57, h: 82 };
const BORDER_1 = { key: 'BORDER_1', text: 'Bord 1 mm', w: 59, h: 84 };
const BORDER_2 = { key: 'BORDER_2', text: 'Bord 2 mm', w: 61, h: 86 };
const BORDER_3 = { key: 'BORDER_3', text: 'Bord 3 mm', w: 63, h: 88 };

const PARENTHESIS = { key: 'PARENTHESIS', value: 'PARENTHESIS', label: '(Set)', getCardEdition: c => `(${c.set})` };
// const BRACKET = { key: 'BRACKET', value: 'BRACKET', label: '{Set}', getCardEdition: c => `{${c.set}}` };
const HOOK = { key: 'HOOK', value: 'HOOK', label: '[Set]', getCardEdition: c => `[${c.set}]` };

const ORDER_QTE = { key: 'deckQte', value: 'Qte' };
const ORDER_SET = { key: 'set', value: 'Set' };
const ORDER_NAME = { key: 'name', value: 'Nom de carte' };

const FORMAT_JSON = { key: 'json', value: 'JSON' };
const FORMAT_TEXT = { key: 'text', value: 'Texte' };


/*
 * page size 210 x 297
 * card size max 63 x 88
 * 63*3 = 189 / margin available 210 - 189 = 21
 * 88*3 = 264 / margin available 297 - 264 = 33
 * 4 spaces : bord space card space card space card space bord
 * padding-x = 20/4 = 5
 * padding-y = 32/4 = 8
 * X1 = 5 / X2 = 5+63+5=73 / X3 = 5+63+5+63+5=141
 * Y1 = 8 / Y2 = 8+88+8=104 / Y3 = 8+88+8+88+8=200
 */
const CARD_Y = 88;
const CARD_X = 63;
const PADDING_X = 5;
const PADDING_Y = 8;
const X1 = PADDING_X;
const X2 = 2 * PADDING_X + CARD_X;
const X3 = 3 * PADDING_X + 2 * CARD_X;
const Y1 = PADDING_Y;
const Y2 = 2 * PADDING_Y + CARD_Y;
const Y3 = 3 * PADDING_Y + 2 * CARD_Y;

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
    PDF_POS: {
      0: { x: X1, y: Y1 }, 1: { x: X2, y: Y1 }, 2: { x: X3, y: Y1 },
      3: { x: X1, y: Y2 }, 4: { x: X2, y: Y2 }, 5: { x: X3, y: Y2 },
      6: { x: X1, y: Y3 }, 7: { x: X2, y: Y3 }, 8: { x: X3, y: Y3 },
    },
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
  },
  search: {
    inclusion: [
      { key: ':', value: 'Exact' },
      { key: '>=', value: 'Au moins' },
      { key: '<=', value: 'Au plus' },
    ],
    colorList: [
      { key: 'b', value: '{B}' },
      { key: 'u', value: '{U}' },
      { key: 'g', value: '{G}' },
      { key: 'r', value: '{R}' },
      { key: 'w', value: '{W}' },
    ],
    rarityList: [
      { key: 'common', value: 'commun' },
      { key: 'uncommon', value: 'peu commun' },
      { key: 'rare', value: 'rare' },
      { key: 'mythic', value: 'mythique' },
    ],
    typeList: [
      { key: 'Token', value: 'Token' },
      { key: 'Legendary', value: 'Legendary' },

      { key: 'Artifact', value: 'Artifact' },
      { key: 'Creature', value: 'Creature' },
      { key: 'Enchantment', value: 'Enchantment' },
      { key: 'Land', value: 'Land' },
      { key: 'Planeswalker', value: 'Planeswalker' },
      { key: 'Instant', value: 'Instant' },
      { key: 'Ritual', value: 'Ritual' },

      { key: 'artifact-types', uri: 'https://api.scryfall.com/catalog/artifact-types' },
      { key: 'creature-types', uri: 'https://api.scryfall.com/catalog/creature-types' },
      { key: 'enchantment-types', uri: 'https://api.scryfall.com/catalog/enchantment-types' },
      { key: 'land-types', uri: 'https://api.scryfall.com/catalog/land-types' },
      { key: 'planeswalker-types', uri: 'https://api.scryfall.com/catalog/planeswalker-types' },
      { key: 'spell-types', uri: 'https://api.scryfall.com/catalog/spell-types' },
    ],
  },
  stats: {
    defaultOptions: {
      yBeginAtZero: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
    },
    functionalities: [
      { search: 'draw', key: 'draw' },
      { search: 'token', key: 'token' },
      { search: 'search', key: 'fetch' },
      { search: 'add {', key: 'mana' },
      { search: 'mana', key: 'mana' },
      { search: 'at the beginning of', key: 'process' },
      { search: 'at the end of', key: 'process' },
      { search: 'when this', key: 'process' },
      { search: 'lifelink', key: 'life' },
      { search: /gains? ?[X\d]* life/, key: 'life' },
      { search: 'tap target', key: 'control' },
      { search: 'extra turn', key: 'control' },
      { search: 'return target', key: 'control' },
      { search: 'destroy target', key: 'control' },
    ],
    byColor: {
      I: {
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        borderColor: 'rgba(100, 100, 100, 1)',
      },
      M: {
        backgroundColor: 'rgba(191, 153, 36, 0.5)',
        borderColor: 'rgba(191, 153, 36, 1)',
      },
      U: {
        backgroundColor: 'rgba(24, 113, 170, 0.5)',
        borderColor: 'rgba(24, 113, 170, 1)',
      },
      G: {
        backgroundColor: 'rgba(71, 173, 25, 0.5)',
        borderColor: 'rgba(71, 173, 25, 1)',
      },
      B: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderColor: 'rgba(0, 0, 0, 1)',
      },
      W: {
        backgroundColor: 'rgba(255, 255, 200, 0.5)',
        borderColor: 'rgba(255, 255, 200, 1)',
      },
      R: {
        backgroundColor: 'rgba(189, 0, 0, 0.5)',
        borderColor: 'rgba(189, 0, 0, 1)',
      },
    }
  },
};

export default CONST;
