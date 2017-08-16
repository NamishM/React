export const taskStatus = {
  Queued: { id: 1, desc: 'Queued' },
  Waiting: { id: 2, desc: 'Waiting' },
  InProgress: { id: 3, desc: 'In Progress' },
  Completed: { id: 4, desc: 'Completed' },
  Hold: { id: 5, desc: 'Hold' },
  Cancelled: { id: 6, desc: 'Cancelled' },
};

// http://stackoverflow.com/a/18341744/402706
function locationOf(element, array, start, end) {
  start = start || 0;
  end = end || array.length;
  const pivot = parseInt(start + ((end - start) / 2), 10);
  if (array[pivot] === element) {
    return pivot;
  } else if (end - start <= 1) {
    return array[pivot].taskSetSequence > element.taskSetSequence ? pivot - 1 : pivot;
  } else if (array[pivot].taskSetSequence < element.taskSetSequence) {
    return locationOf(element, array, pivot, end);
  }
  return locationOf(element, array, start, pivot);
}

// http://stackoverflow.com/q/1344500/402706
export const insertSortedTask = (element, array) => {
  if (!array || array.length === 0) {
    return [element];
  }
  array.splice(locationOf(element, array) + 1, 0, element);
  return array;
};
