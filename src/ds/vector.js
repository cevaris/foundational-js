const INIT_LENGTH = 10;

/**
 * Vector manages an internal fixed array to contain a list of elements.
 * Internal array grows/shrinks/shifts as needed. 
 * Note: Array.push is not used because we purposefully seal the Array to a fixed size. 
 */
class Vector {
    constructor() {
        this.array = newArray(INIT_LENGTH);
        this.size = 0;
        this.tailIndex = 0;
    }

    get(index) {
        return this.array[index];
    }

    set(index, value) {
        if (index > this.array.length) {
            this.array = extendArray(this.array, index + 1);
        }
        this.array[index] = value;
    }

    push(value) {
        if (this.size / this.array.length > 0.8) {
            // extend array size
            this.array = extendArray(this.array, this.size + INIT_LENGTH);
        }

        this.array[this.tailIndex] = value;
        this.size++;
        this.tailIndex++;
    }

    pop() {
        if (this.tailIndex > 0) {
            const value = this.array[this.tailIndex - 1];
            this.tailIndex--;
            // possiblyShrink();
            return value;
        } else {
            return undefined;
        }
    }

    /**
     * Iterate over every value, preserve values if the predicate function return true.
     * @param {Function} predicate Function that takes one parameter and returns a boolean.
     */
    filter(predicate) {
        const results = new Vector();
        for (const value of this) {
            if (predicate(value)) {
                results.push(value);
            }
        }
        return results;
    }

    [Symbol.iterator]() {
        // save a reference to `this` object; 
        const vector = this;
        let i = 0;
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

function extendArray(currArr, newLength) {
    const arr = newArray(newLength);
    for (let i = 0; i < currArr.length; i++) {
        arr[i] = currArr[i];
    }
    return arr;
}

module.exports = Vector