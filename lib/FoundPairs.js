'use strict';

/**
 * Found pairs of elements with a sum equals target and return sum of the indexes of all pairs.
 * No element used more than one.
 * If multiple pairs, the lowest sum of indexes returned.
 * @param [] array
 *  The array of elements to pair.
 * @param float target
 *  The target of sume of elements.
 * @returns float
 *  The sum of indexes or 0 if not found.
 */

module.exports = (array, target) => {
  let pairs = [];
  for (let i=0; i < array.length; i++) {
    if (pairs.indexOf(i) >= 0 || isNaN(array[i])) {
        continue;
    }
    for (let y=0; y < array.length; y++) {
      if (pairs.indexOf(y) >= 0 || i==y || isNaN(array[y])) {
          continue
      }
      if ((array[i] + array[y]) === target) {
          pairs.push(i,y);
          break;
      }
    }
  }

  return pairs.length === 0 ? 0 : pairs.reduce((total, element) => total += element);
}
