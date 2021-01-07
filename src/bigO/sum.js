function sum(array) {
    let total = 0;
    array.forEach(e => total += e);
    return total;
}

console.log(sum([1, 2, 3, 4, 5]));

// complexity: O(N)
// space: O(1)