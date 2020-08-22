const settings = {
  backgroundDefault: [
    { key: 'first', value: 'First' },
    { key: 'expensive', value: 'Highest ccm' },
    { key: 'rarest', value: 'Rarest' },
  ],
  keys: {
    global: 'global',
    deck: 'deck',
    favoriteLanguage: { global: true, key: 'favoriteLanguage', type: String, store: 'setFavoriteLanguage' },
    typeGrouping: { global: false, key: 'typeGrouping', type: Boolean, store: 'setTypeGrouping' },
    typePriority: { global: false, key: 'typePriority', type: Array, store: 'setTypePriority' },
    sorting: { global: false, key: 'sorting', type: Array, store: 'setSorting' },
    backgroundActivated: { global: false, key: 'backgroundActivated', type: Boolean, store: 'setBackgroundActivated' },
    backgroundDefault: { global: false, key: 'backgroundDefault', type: String, store: 'setBackgroundDefault' },
    backgroundImage: { global: false, key: 'backgroundImage', type: String, store: 'setBackgroundImage' },
    backgroundArtist: { global: false, key: 'backgroundArtist', type: String, store: 'setBackgroundArtist' },
  },
};

export default settings;
