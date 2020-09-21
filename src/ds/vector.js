const INIT_LENGTH = 10;

class Vector {
    // Current number of values in array
    length;
    // Fixed array value
    array;
    // index of tail value.
    tailIndex;

    constructor() {
        this.array = [...new Array(INIT_LENGTH)];
        this.length = 0;
        this.tailIndex = 0;
    }

    get length() {
        return this.length;
    }

    push(value) {
        if ((this.length + 1) > this.array.length) {
            const newLength = this.length + INIT_LENGTH;
            const arr = [...new Array(newLength)];
            for (let i = 0; i < this.array.length; i++) {
                arr[i] = this.array[i];
            }
            this.array = arr;
        }

        this.array[this.tailIndex] = value;
        this.length++;
        this.tailIndex++;
    }

    get(index) {
        return this.array[index];
    }
}

module.exports = Vector