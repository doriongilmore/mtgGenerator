import CONST from './CONST';

/**
 * Fires automatically when dragdrop detected, checks if allowed
 * @param {Object} event (automatic)
 * @return {boolean}
 */
function onDragAndMove(event) {
  const list = event.relatedContext.list;
  const draggedElement = event.draggedContext.element;
  const sameList = event.from === event.to;
  const isPresent = !!list.find(el => el.id === draggedElement.id);
  const allowMove = !sameList && !isPresent;

  if (sameList) {
    console.warn('manual sort not allowed.');
  } else if (isPresent) {
    console.warn('object already present in this list.');
  }

  return allowMove;
}
/**
 * Fires automatically when a dragdrop succeeds, clones a card
 * add deck properties to a card from search result
 * doesn't change cards from other lists
 * @param {Card} card
 * @return {Object}
 */
function addCardToDeck(card) {
  if (!card.deckQte) {
    card.deckQte = 4;
  }
  if (!card.printConfig) {
    card.printConfig = card.type_line.includes('Basic Land')
      ? CONST.printConfig.DONT_PRINT.key
      : CONST.printConfig.BORDER_3.key;
  }
  return card;
}
/**
 * Fires automatically when a dragdrop succeeds in new list area
 * creates a new list with default name and reset tmp list
 */
function createNewList(compThis, name = 'Choose a name') {
  compThis.deck.lists.push({
    name,
    ignoreStat: false,
    list: [...compThis.tmpList],
  });
  compThis.tmpList = [];
}

export { onDragAndMove, addCardToDeck, createNewList };
