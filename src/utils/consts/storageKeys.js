const CORE = 'mtgBuilder.';

const storageKeys = {
  tutorial: `${CORE}tutorial`,
  deckList: `${CORE}deckList`,
  cards: `${CORE}cards`,
  settings: `${CORE}settings`,
  notSupported: ['deckList', 'tmpDeck', 'settings'],
};

export default storageKeys;
