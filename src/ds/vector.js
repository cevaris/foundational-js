const INIT_LENGTH = 10;

class Vector {
    constructor() {
        this.array = newArray(INIT_LENGTH);
        this.size = 0;
        this.tailIndex = 0;
    }

    push(value) {
        if ((this.size + 1) > this.array.length) {
            const newLength = this.size + INIT_LENGTH;
            const arr = newArray(newLength);
            for (let i = 0; i < this.array.length; i++) {
                arr[i] = this.array[i];
            }
            this.array = arr;
        }

        this.array[this.tailIndex] = value;
        this.size++;
        this.tailIndex++;
    }

    get(index) {
        return this.array[index];
    }

    [Symbol.iterator]() {
        let i = 0;
        let vector = this;
        return {
            next() {
                const value = vector.get(i);
                if (i < vector.tailIndex) {
                    i++;
                    return { value: value, done: false };
                } else {
                    return { value: value, done: true };
                }
            }
        }
    }
}

/**
 * Creates new fixed sized array, of given size. 
 */
function newArray(size) {
    const ls = new Array(size);
    ls.fill(undefined);
    Object.seal(ls);
    return ls;
}

module.exports = Vector