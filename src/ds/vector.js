/**
 * Vector manages an internal fixed array to contain a list of elements.
 * Internal array grows/shrinks/shifts as needed. 
 * Note: Array.push is not used because we purposefully seal the Array to a fixed size. 
 */
export class Vector {
    constructor() {
        this.array = newArray(0);
    }

    get length() {
        return this.array.length;
    }

    get(index) {
        return this.array[index];
    }

    set(index, value) {
        if (index >= this.array.length) {
            this.array = extendArr(this.array, this.array.length + index + 1);
        }
        this.array[index] = value;
    }

    push(value) {
        this.array = extendArr(this.array, this.array.length + 1);
        this.array[this.array.length - 1] = value;
        return this.array.length - 1;
    }

    pop() {
        const index = this.array.length - 1;
        const value = this.get(index);

        if (index >= 0) {
            // shortens array, does not include last element
            this.array = truncateArr(this.array, index);
        }

        return value;
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
                if (i < vector.length) {
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

function extendArr(currArr, newLength) {
    const arr = newArray(newLength);
    for (let i = 0; i < currArr.length; i++) {
        arr[i] = currArr[i];
    }
    return arr;
}

function truncateArr(currArr, newLength) {
    const arr = newArray(newLength);
    for (let i = 0; i < newLength; i++) {
        arr[i] = currArr[i];
    }
    return arr;
}

