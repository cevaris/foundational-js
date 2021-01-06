// requires sorted array
function contains(value, arr) {
    const middleIndex = Math.round((arr.length - 1) / 2);
    const middleValue = arr[middleIndex];

    if (value === middleValue) {
        return true;
    }

    if (arr.length < 2) {
        return false;
    }

    if (value < middleValue) {
        return contains(value, arr.slice(0, middleIndex + 1));
    }

    if (value > middleValue) {
        return contains(value, arr.slice(middleIndex, arr.length));
    }
}

console.log(contains(10, [1, 2, 3, 4, 5]));
console.log(contains(3, [1, 2, 3, 4, 5]));
console.log(contains(3, []));