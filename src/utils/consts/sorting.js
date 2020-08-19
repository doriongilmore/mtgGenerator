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

const ColorSort = { key: 'ColorSort', label: 'By color', fn: sortByColor };
const QteSort = { key: 'QteSort', label: 'By quantity', fn: sortByQte };
const NameSort = { key: 'NameSort', label: 'By name', fn: sortByName };
const CmcSort = { key: 'CmcSort', label: 'By cmc', fn: sortByCmc };

const typeList = [
  { key: 'Planeswalker', value: 'Planeswalker' },
  { key: 'Instant', value: 'Instant' },
  { key: 'Sorcery', value: 'Sorcery' },
  { key: 'Artifact', value: 'Artifact' },
  { key: 'Creature', value: 'Creature' },
  { key: 'Enchantment', value: 'Enchantment' },
  { key: 'Artifact Creature', value: 'Artifact Creature' },
  { key: 'Enchantment Artifact', value: 'Enchantment Artifact' },
  { key: 'Enchantment Creature', value: 'Enchantment Creature' },
  { key: 'Enchantment Artifact Creature', value: 'Enchantment Artifact Creature' },
  { key: 'Land Creature', value: 'Land Creature' },
  { key: 'Land', value: 'Land' },
  { key: 'Artifact Land', value: 'Artifact Land' },
];

const sorting = {
  defaultTypePriority: typeList,
  CmcSort,
  ColorSort,
  QteSort,
  NameSort,
  defaultSortPriority: [CmcSort, ColorSort, QteSort, NameSort],
};

export default sorting;
