const PARENTHESIS = { key: 'PARENTHESIS', value: 'PARENTHESIS', label: '(Set)', getCardEdition: c => `(${c.set})` };
// const BRACKET = { key: 'BRACKET', value: 'BRACKET', label: '{Set}', getCardEdition: c => `{${c.set}}` };
const HOOK = { key: 'HOOK', value: 'HOOK', label: '[Set]', getCardEdition: c => `[${c.set}]` };

const ORDER_QTE = { key: 'deckQte', value: 'Qte' };
const ORDER_SET = { key: 'set', value: 'Set' };
const ORDER_NAME = { key: 'name', value: 'Card Name' };

const FORMAT_JSON = { key: 'json', value: 'JSON' };
const FORMAT_TEXT = { key: 'text', value: 'Text' };

const DORION = {
  key: 'DORION',
  value: 'doriongilmore.fr',
  short: 'dorion',
  format: FORMAT_JSON,
};
const UNTAP = {
  key: 'UNTAP',
  value: 'untap.in',
  short: 'untap',
  format: FORMAT_TEXT,
  order: [ORDER_QTE, ORDER_NAME, ORDER_SET],
  set: PARENTHESIS,
};
const MAGIC_CORP = {
  key: 'MAGIC_CORP',
  value: 'magiccorporation.com',
  short: 'magiccorp',
  format: FORMAT_TEXT,
  order: [ORDER_QTE, ORDER_SET, ORDER_NAME],
  set: HOOK,
};

const exportFormats = {
  FORMAT_JSON,
  FORMAT_TEXT,
  DORION,
  MAGIC_CORP,
  UNTAP,
  list: [DORION, MAGIC_CORP, UNTAP],
};

export default exportFormats;
