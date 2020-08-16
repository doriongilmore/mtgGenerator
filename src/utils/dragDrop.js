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

function changeListOrder(list, indexToMove, moveUp) {
  if ((!indexToMove && moveUp) || (indexToMove === list.length - 1 && !moveUp)) {
    throw 'wrong params';
  }
  const otherIndex = indexToMove + (moveUp ? -1 : +1);
  const newList = [...list];
  const tmp = newList[indexToMove];
  newList[indexToMove] = newList[otherIndex];
  newList[otherIndex] = tmp;
  return newList;
}

export { onDragAndMove, changeListOrder };
