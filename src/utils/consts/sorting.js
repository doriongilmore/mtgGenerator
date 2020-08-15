const colorRegexp = /[WBUGR]/gi;
const colorPriority = 'IWBUGRM';

const identity = manaCost => {
  const colors = [...new Set(manaCost.match(colorRegexp) || ['I'])].join('');
  return colors.length === 1 ? colors : 'M';
};

const sortByColor = (cardA, cardB) => {
  const cardAIndex = colorPriority.indexOf(identity(cardA.mana_cost));
  const cardBIndex = colorPriority.indexOf(identity(cardB.mana_cost));
  if (cardAIndex < cardBIndex) {
    return -1;
  } else if (cardAIndex > cardBIndex) {
    return 1;
  }
  return 0;
};

const sortByQte = (cardA, cardB) => {
  if (cardA.deckQte < cardB.deckQte) {
    return -1;
  } else if (cardA.deckQte > cardB.deckQte) {
    return 1;
  }
  return 0;
};

const sortByName = (cardA, cardB) => {
  if (cardA.name < cardB.name) {
    return -1;
  } else if (cardA.name > cardB.name) {
    return 1;
  }
  return 0;
};

const sortByCmc = (cardA, cardB) => {
  if (cardA.cmc < cardB.cmc) {
    return -1;
  } else if (cardA.cmc > cardB.cmc) {
    return 1;
  }
  return 0;
};

const ColorSort = { label: 'By color', fn: sortByColor };
const QteSort = { label: 'By quantity', fn: sortByQte };
const NameSort = { label: 'By name', fn: sortByName };
const CmcSort = { label: 'By cmc', fn: sortByCmc };

const sorting = {
  CmcSort,
  NameSort,
  ColorSort,
  QteSort,
  defaultPriority: [CmcSort, ColorSort, QteSort, NameSort],
};

export default sorting;
