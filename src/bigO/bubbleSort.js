function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {

            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

console.log(bubbleSort([1, 3, 43, 2, 3, 6, 9]));
console.log(bubbleSort([10, 9, 8, 4, 3, 2, 1]));

// complexity: O(N^2)
// space: O(1)