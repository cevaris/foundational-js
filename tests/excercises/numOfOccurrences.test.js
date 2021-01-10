/**
 * Count the number of occurrences for each unique value.
 * Return response in an Array of key/values pairs. 
 * 
 * // FYI, this is how to return the key/value array response.
 * const map = new HashMap();
 * const array = Array.from(map);
 * return
 */

const { HashMap } = require('../../src/ds/hashMap');

test('count numbers with variant occurrences', () => {
    const arr = [1, 2, 2, 1, 3, 3, 5, 3];
    expect(numOfOccurrences(arr)).toEqual(expect.arrayContaining([
        { key: 1, value: 2 },
        { key: 2, value: 2 },
        { key: 3, value: 3 },
        { key: 5, value: 1 },
    ]));
});

test('count numbers with no duplicate occurrences', () => {
    const arr = [1, 2, 3, 4];
    expect(numOfOccurrences(arr)).toEqual(expect.arrayContaining([
        { key: 1, value: 1 },
        { key: 2, value: 1 },
        { key: 3, value: 1 },
        { key: 4, value: 1 },
    ]));
});

test('count strings with variant occurrences', () => {
    const arr = ['a', 'b', 'a', 'b', 'c'];
    expect(numOfOccurrences(arr)).toEqual(expect.arrayContaining([
        { key: 'a', value: 2 },
        { key: 'b', value: 2 },
        { key: 'c', value: 1 },
    ]));
});

test('count nothing if array is empty', () => {
    const arr = [];
    expect(numOfOccurrences(arr)).toEqual([]);
});

test('count objects with variant occurrences', () => {
    const arr = [{ 'obj1': 1 }, { 'obj1': 2 }, { 'obj1': 1 }];
    expect(numOfOccurrences(arr)).toEqual(expect.arrayContaining([
        { key: { obj1: 1 }, value: 2 },
        { key: { obj1: 2 }, value: 1 },
    ]));
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