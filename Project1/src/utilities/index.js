import isFunction from 'lodash/isFunction';
import getTime from 'date-fns/get_time';

/**
 * Creates a timeout with a backup interval that will fire the callback
 * in the event that the application sleeps and wakes past the designated milliseconds.
 * @param {function} callback
 * @param {number} milliseconds
 * @returns {function} clearTimeout
 */
export function trueTimeout(callback, milliseconds) {
  const createdTime = getTime(new Date());
  let interval = null;

  const defaultTimeout = setTimeout(() => {
    clearInterval(interval);
    callback();
  }, milliseconds);

  interval = setInterval(() => {
    const currentTime = getTime(new Date());
    if (currentTime - createdTime > milliseconds) {
      clearTimeout(defaultTimeout);
      clearInterval(interval);
      callback();
    }
  }, 100);

  return () => {
    clearTimeout(defaultTimeout);
    clearInterval(interval);
  };
}

/**
 * @typedef {function(Object):string} propertyCallback
 */

/**
 * Reduces an array of objects to a string using a delimiter.
 *
 * @export
 * @param {Object[]} items an array of objects.
 * @param {string|propertyCallback} property the property name as a string or a
 * function with the sig (object) => return 'string'
 * @param {string} [delimiter=',']
 * @returns {string} a delimited string
 */
export function reduceObjectsToString(items, property, delimiter = ',') {
  if (!items || items.length <= 0 || !items.reduce) {
    return '';
  }

  const accessor = isFunction(property) ? property : obj => `${obj[property]}`;

  return items.reduce((prev, cur) =>
    (prev ? `${prev}${delimiter}${accessor(cur)}` : accessor(cur))
    , '');
}

// JSDoc not working for below format: https://github.com/Microsoft/TypeScript/issues/11597

/**
 * @typedef {function(Object):Object} onFindCallback
 */

/**
 * Takes a delimited string of object keys, splits on the delimiter and then finds
 * the corresponding objects in the passed in array of items
 * @export
 * @param {Object} options - The options/config to pass in
 * @param {string} options.idString - (required) The delimited string
 * @param {Object[]} options.items - (required) The array of objects to search
 * @param {string|propertyCallback} options.property - (required) the property or method
 * to call match the object
 * @param {onFindCallback} options.onFind - callback method for each found object
 * @param {string} options.delimiter = ',' The string delimiter
 * @returns {Object[]}
 */
export function findObjectsInIdString({
  idString,
  items,
  property,
  onFind,
  delimiter = ',',
}) {
  // eslint-disable-next-line eqeqeq
  const matcher = isFunction(property) ? property : (obj, id) => obj[property] == id;

  return (idString || '').split(delimiter).reduce((prev, id) => {
    // eslint-disable-next-line eqeqeq
    let item = items.find(obj => matcher(obj, id));
    if (item) {
      // immutable copy
      item = {
        ...item,
      };

      item = isFunction(onFind) ? onFind(item) : item;

      prev.push(item);
    }
    return prev;
  }, []);
}

// https://muffinresearch.co.uk/removing-leading-whitespace-in-es6-template-strings/
/**
 * Converts a multiline ES6 templated string into a single line
 * @export
 * @param {any} strings
 * @param {any} values
 * @returns a single line string
 */
export function singleLineString(strings, ...values) {
  // Interweave the strings with the
  // substitution vars first.
  let output = '';
  for (let i = 0; i < values.length; i += 1) {
    output += strings[i] + values[i];
  }
  output += strings[values.length];

  // Split on newlines.
  const lines = output.split(/(?:\r\n|\n|\r)/);

  // Rip out the leading whitespace.
  return lines.map(line =>
    line.replace(/^\s+/gm, ''),
  ).join('').trim();
}
