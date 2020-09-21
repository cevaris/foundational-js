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

    push(value) {
        if ((this.size + 1) > this.array.length) {
            // extend array size
            const newLength = this.size + INIT_LENGTH;
            const arr = newArray(newLength);
            for (let i = 0; i < this.array.length; i++) {
                arr[i] = this.get(i);
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

    removeIndex(value) {

    }

    /**
     * Iterate over every value, preserve values if the predicate function return true.
     * @param {Function} predicate Function that takes one parameter and returns a boolean.
     */
    filter(predicate) {
        const results = new Vector();
        for(const value of this){
            if(predicate(value)) {
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

module.exports = Vector