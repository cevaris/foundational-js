function permutations(arr) {
    const results = [];
    const n = arr.length;

    if (n === 0) {
        return [[]];
    } else {
        const head = arr.shift();
        const words = permutations(arr);

        words.forEach(function (word) {
            for (let i = 0; i < n; ++i) {
                const tmp = word.slice();
                tmp.splice(i, 0, head)
                results.push(tmp);
            }
        });
    }

    return results;
}

console.log(permutations([3, 2, 1]))