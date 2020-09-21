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

    /**
     * Sets a value at the provided Vector index. 
     * If the index location is larger than existing Vector, the Vector is resized.
     */
    set(index, value) {
        if (index >= this.length) {
            this.array = extendArr(this.array, this.length + index + 1);
        }
        this.array[index] = value;
    }

    /**
     * Pushes a value to the end of the Vector.
     * Returns index of where value was inserted. 
     */
    push(value) {
        this.array = extendArr(this.array, this.length + 1);
        this.array[this.length - 1] = value;
        return this.length;
    }

    /**
     * Removes last element in Vector. 
     * If no elements are left, returns undefined. 
     */
    pop() {
        const index = this.length - 1;
        const value = this.get(index);

        if (index >= 0) {
            // shortens array, does not include last element
            this.array = truncateArr(this.array, index);
        }

        return value;
    }

    /**
     * Remove items from Vector starting at `start` index, up to follwing deleteCount elements.
     */
    splice(start, deleteCount) {
        const response = new Vector();
        if (start < this.length) {
            const vector = new Vector();
            for (let i = 0; i < this.length; i++) {
                if (i < start || i > (start + deleteCount - 1)) {
                    vector.push(this.get(i));
                } else {
                    response.push(this.get(i));
                }
            }
            this.array = vector.array;
        }
        return response;
    }

    /**
     * Iterate over every value, preserve values if the predicate function return true.
     * @param {Function} predicate Function that takes one parameter and returns a boolean.
     */
    filter(predicate) {
        const vector = new Vector();
        for (const value of this) {
            if (predicate(value)) {
                vector.push(value);
            }
        }
        return vector;
    }

    /**
     * Defines an iterator such that callers can easily iterate over Vector.
     * ex. 
     * 
     * for (const e of vector) {
     *    console.log(e);
     * }
     */
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
    const array = new Array(size);
    array.fill(undefined);
    Object.seal(array);
    return array;
}

/**
 * Grows the array to the provided length. 
 * Copies all existing elements into new array.
 */
function extendArr(currArr, newLength) {
    const array = newArray(newLength);
    for (let i = 0; i < currArr.length; i++) {
        array[i] = currArr[i];
    }
    return array;
}

/**
 * Shortens the provided array up the provided length.
 * Copies all existing elements into new array.
 */
function truncateArr(currArr, newLength) {
    const array = newArray(newLength);
    for (let i = 0; i < newLength; i++) {
        array[i] = currArr[i];
    }
    return array;
}
