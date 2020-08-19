const settings = {
  keys: {
    global: 'global',
    deck: 'deck',
    favoriteLanguage: { global: true, key: 'favoriteLanguage', type: String, store: 'setFavoriteLanguage' },
    typeGrouping: { global: false, key: 'typeGrouping', type: Boolean, store: 'setTypeGrouping' },
    typePriority: { global: false, key: 'typePriority', type: Array, store: 'setTypePriority' },
    sorting: { global: false, key: 'sorting', type: Array, store: 'setSorting' },
  },
};

export default settings;
