function permutations(arr) {
    const results = [];

    if (arr.length === 0) {
        return [[]];
    } else {
        const n = arr.length;
        const head = arr.shift();
        const elements = permutations(arr);

        elements.forEach(function (word) {
            for (let i = 0; i < n; ++i) {
                const tmp = word.slice();
                tmp.splice(i, 0, head)
                results.push(tmp);
            }
        });
    }

    return results;
}

console.log(permutations([3, 2, 1]).sort())
// permutation(N-1) + permutation(N-2) ..  permutation([])
// N + N-1*N + N-2*N .. 0
// N  N*4

// N*(N-1*N-1 + N-2*N-2 + ... +0)

// 5!= 5 * 4 * 3 * 2 * 1 = 120

// 25+20+15+10+5+0 = 75


