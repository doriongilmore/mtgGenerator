const dontChange = (cardA, cardB) => 0;

// reversed compared to sorting.sortByCmc
const sortByCmc = (cardA, cardB) => {
  if (cardA.cmc < cardB.cmc) {
    return 1;
  } else if (cardA.cmc > cardB.cmc) {
    return -1;
  }
  return 0;
};

const rarityList = ['common', 'uncommon', 'rare', 'mythic'];
const sortByRarity = (cardA, cardB) => {
  const rarityAIndex = rarityList.indexOf(cardA.rarity);
  const rarityBIndex = rarityList.indexOf(cardB.rarity);
  if (rarityAIndex < rarityBIndex) {
    return -1;
  } else if (rarityAIndex > rarityBIndex) {
    return 1;
  }
  return 0;
};
const none = { key: 'none', value: 'None', fn: dontChange };
const first = { key: 'first', value: 'First', fn: dontChange };
const expensive = { key: 'expensive', value: 'Highest ccm', fn: sortByCmc };
const rarest = { key: 'rarest', value: 'Rarest', fn: sortByRarity };

const settings = {
  backgroundDefault: {
    none,
    first,
    expensive,
    rarest,
    list: [none, first, expensive, rarest],
  },
  keys: {
    global: 'global',
    deck: 'deck',
    favoriteLanguage: { global: true, key: 'favoriteLanguage', type: String, store: 'setFavoriteLanguage' },
    typeGrouping: { global: false, key: 'typeGrouping', type: Boolean, store: 'setTypeGrouping' },
    typePriority: { global: false, key: 'typePriority', type: Array, store: 'setTypePriority' },
    sorting: { global: false, key: 'sorting', type: Array, store: 'setSorting' },
    backgroundDefault: { global: false, key: 'backgroundDefault', type: String, store: 'setBackgroundDefault' },
    backgroundImage: { global: false, key: 'backgroundImage', type: String, store: 'setBackgroundImage' },
    backgroundArtist: { global: false, key: 'backgroundArtist', type: String, store: 'setBackgroundArtist' },
  },
};

export default settings;
