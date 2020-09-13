const CORE = 'mtgBuilder.';

const storageKeys = {
  deckList: `${CORE}deckList`,
  cards: `${CORE}cards`,
  settings: `${CORE}settings`,
  notSupported: ['deckList', 'tmpDeck', 'settings'],
};

export default storageKeys;
