/**
 * Count the number of occurrences for each unique value.
 * Return response in an Array of key/values pairs. 
 * 
 * // FYI, this is how to return the key/value array response.
 * const map = new HashMap();
 * const array = Array.from(map);
 * return array;
 */

const { HashMap } = require('../../src/ds/hashMap');

test('count numbers', () => {
    const arr = [1, 2, 2, 1, 3, 3, 5, 3];
    expect(numOfOccurrences(arr)).toEqual([
        { key: 3, value: 3 },
        { key: 5, value: 1 },
        { key: 2, value: 2 },
        { key: 1, value: 2 }
    ]);
});

function numOfOccurrences(arr) {
    const occurrenceMap = new HashMap();
    arr.forEach(n => {
        if (occurrenceMap.includes(n)) {
            occurrenceMap.put(n, occurrenceMap.get(n) + 1);
        } else {
            occurrenceMap.put(n, 1);
        }
    });

    return Array.from(occurrenceMap);
}