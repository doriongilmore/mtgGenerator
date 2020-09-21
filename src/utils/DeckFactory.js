import CONST from 'src/utils/CONST';

function createNewList(list = [], name = 'Choose a name') {
  return {
    name,
    ignoreStat: false,
    list: [...list],
  };
}

function getDefaultList() {
  return [createNewList([], 'Main List')];
}

function simplifyCard(c) {
  const card_faces = [];
  const isDoubleFace = !!c.card_faces && c.card_faces.length > 1;
  const addFace = face => {
    const cardFace = { ...face };
    cardFace.id = c.id;
    cardFace.art_crop = cardFace.image_uris.art_crop;
    cardFace.image_uri = cardFace.image_uris.large || cardFace.image_uris.normal;
    cardFace.isCreature = cardFace.type_line.includes('Creature');
    cardFace.isPlaneswalker = cardFace.type_line.includes('Planeswalker');
    cardFace.isToken = cardFace.type_line.includes('Token');
    cardFace.isLegend = cardFace.type_line.includes('Legend');
    cardFace.isSnow = cardFace.type_line.includes('Snow');
    card_faces.push(cardFace);
  };
  if (isDoubleFace) {
    for (let i = 0; i < c.card_faces.length; i++) {
      addFace(c.card_faces[i]);
    }
  } else {
    addFace(c);
  }
  c.card_faces = card_faces;
  c.isDoubleFace = isDoubleFace;
  return c;
}
function simplifyList(list) {
  return list.list.map(simplifyCard);
}
function stringifyList(list) {
  return JSON.stringify({
    name: list.name,
    list: simplifyList(list),
  });
}

function createImage(image_uri) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = err => reject(err);
    img.src = image_uri;
  });
}

function cleanDeck(deck) {
  for (let j = 0; j < deck.lists.length; j++) {
    deck.lists[j].list = deck.lists[j].list.filter(c => +c.deckQte);
  }
  deck.lists = deck.lists.filter(l => l.list.length);
  if (!deck.lists.length) {
    deck.lists = getDefaultList();
  }
}
function updateDeckCardCount(deck) {
  const [mainList, ...otherLists] = deck.lists;
  const mainCardCount = mainList.list.reduce(DeckFactory.countCardByList, 0);
  const otherCardCount = (otherLists || []).reduce(DeckFactory.countCardByLists, 0);
  deck.cardCount = `${mainCardCount} (+${otherCardCount})`;
}
function updateDeckColors(deck, cardsInfo) {
  const cards = DeckFactory.getCardsFromDecks([deck]);
  const colors = cards.reduce((col, card) => {
    const info = cardsInfo[card.id];
    for (let i = 0, l = info.color_identity.length; i < l; i++) {
      const color = `{${info.color_identity[i]}}`;
      if (!col.includes(color)) {
        col.push(color);
      }
    }
    return col;
  }, []);
  deck.colors = colors.join('');
}

class DeckFactory {
  /**
   *
   * @param {[DeckList]} lists
   * @returns {[Card]}
   */
  static getCardsFromLists(lists) {
    const allCards = [];
    for (let j = 0, m = lists.length; j < m; j++) {
      const cards = lists[j].list;
      for (let k = 0, n = cards.length; k < n; k++) {
        const card = cards[k];
        if (!allCards.find(c => c.id === card.id)) {
          allCards.push(card);
        }
      }
    }
    return allCards;
  }
  /**
   *
   * @param {[Deck]} decks
   * @returns {[Card]}
   */
  static getCardsFromDecks(decks) {
    const allCards = [];
    for (let i = 0, l = decks.length; i < l; i++) {
      const deck = decks[i];
      const deckCards = DeckFactory.getCardsFromLists(deck.lists);
      allCards.push(...deckCards);
    }
    return allCards;
  }
  /**
   * reduce method to be executed on a DeckList.list
   * @param {Number} count - the acc param
   * @param {Card} card - the el param
   * @returns {Number}
   */
  static countCardByList(count, card) {
    return +card.deckQte + count;
  }
  /**
   * reduce method to be executed on a Deck.lists
   * @param {Number} totalCount - the acc param
   * @param {DeckList} list - the el param
   * @returns {Number}
   */
  static countCardByLists(totalCount, list) {
    return totalCount + list.list.reduce(DeckFactory.countCardByList, 0);
  }
  /**
   * @param {Deck} deck
   * @param {Object} cardsInfo
   * @param {boolean} clean
   */
  static update(deck, cardsInfo, clean = true) {
    if (!deck) {
      return;
    }
    clean && cleanDeck(deck);
    updateDeckCardCount(deck);
    updateDeckColors(deck, cardsInfo);
    deck.dateEdition = new Date();
    return deck;
  }
  /**
   * @returns {Deck}
   */
  static getDeckToCreate() {
    const now = new Date();
    return {
      id: now.getTime(),
      name: 'Default Deck Name',
      colors: '',
      cardCount: '0 (+0)',
      lists: getDefaultList(),
      dateCreation: now,
      dateEdition: now,
      background: null,
    };
  }
  /**
   * @param {Deck} deckA
   * @param {Deck} deckB
   * @returns {boolean}
   */
  static areSameDeck(deckA, deckB) {
    if (!deckA || !deckB) {
      return false;
    }
    const sameName = deckA.name === deckB.name;
    const sameCardCount = deckA.cardCount === deckB.cardCount;
    const sameColors = deckA.colors === deckB.colors;
    const sameListCount = deckA.lists.length === deckB.lists.length;
    const sameLists = sameListCount && JSON.stringify(deckA.lists) === JSON.stringify(deckB.lists);

    return sameName && sameCardCount && sameColors && sameLists;
  }
  /**
   * @param {DeckList} list
   * @returns {Array<Card>}
   */
  static simplifyList(list) {
    return simplifyList(list);
  }
  /**
   * @param {Card} card
   * @returns {Card}
   */
  static simplifyCard(card) {
    return simplifyCard(card);
  }
  /**
   * @param {Array<Card>} list
   * @param {String} name
   * @returns {DeckList}
   */
  static createNewList(list = [], name = 'Choose a name') {
    return createNewList(list, name);
  }
  static cloneCardForDeck(card) {
    const newCard = { id: card.id };
    newCard.deckQte = 4;
    newCard.printConfig = card.type_line.includes('Basic Land')
      ? CONST.printConfig.DONT_PRINT.key
      : CONST.printConfig.BORDER_3.key;
    return newCard;
  }
  /**
   * @param {Deck} deck
   * @returns {Deck}
   */
  static cloneDeck(deck) {
    const newDeck = { ...deck };
    newDeck.lists = newDeck.lists.map(l => {
      return {
        name: l.name,
        ignoreStat: l.ignoreStat,
        list: l.list.map(c => ({ ...c })),
      };
    });
    return newDeck;
  }
}

export default DeckFactory;
