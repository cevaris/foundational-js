/**
 * Count the number of occurrences for each unique value.
 * Return response in an Array of key/values pairs. 
 * 
 * // FYI, this is how to return the response.
 * const map = new HashMap();
 * const array = Array.from(map);
 */

const { HashMap } = require("../ds/hashMap");

let arr = [1, 2, 2, 1, 3, 3, 5, 3];
console.log(numOfOccurrences(arr));
// [
//     { key: 3, value: 3 },
//     { key: 5, value: 1 },
//     { key: 2, value: 2 },
//     { key: 1, value: 2 }
// ]

arr = [1, 2, 3, 4];
console.log(numOfOccurrences(arr));
// [
//     { key: 3, value: 1 },
//     { key: 4, value: 1 },
//     { key: 2, value: 1 },
//     { key: 1, value: 1 }
// ]

arr = ['a', 'b', 'a', 'b', 'c'];
console.log(numOfOccurrences(arr));
// [
//     { key: 'b', value: 2 },
//     { key: 'a', value: 2 },
//     { key: 'c', value: 1 }
// ]

arr = [];
console.log(numOfOccurrences(arr));
// []

arr = [{ 'obj1': 1 }, { 'obj1': 2 }, { 'obj1': 1 }];
console.log(numOfOccurrences(arr));
// [ { key: { obj1: 2 }, value: 1 }, { key: { obj1: 1 }, value: 2 } ]


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