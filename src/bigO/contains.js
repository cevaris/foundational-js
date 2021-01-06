function contains(value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return true;
        }
    }
    return false;
}

console.log(contains(10, [1, 2, 3, 4, 5]));
console.log(contains(3, [1, 2, 3, 4, 5]));