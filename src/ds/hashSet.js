import { LinkedList } from './linkedList';
// Symbol.iterator

// capacity = number of buckets * load factor
// const key = hash({foo: 'bar'})

const BucketSize = 10;

export class HashSet {

    constructor() {
        // Using a fixed array for the table to prevent resizing
        // Otherwise we can accidentally break the modulo mapping.
        this.buckets = newFixedArray(BucketSize);
        this.buckets.forEach((_, i) => this.buckets[i] = new LinkedList());
        this.size = 0;
    }

    add(value) {
        const hashNumber = hashCode(value);
        const bucketIdx = hashNumber % BucketSize;
        const bucket = this.buckets[bucketIdx];

        if (bucket.includes(value)) {
            return;
        }

        bucket.add(value);
        this.size++;
    }

    includes(value) {
        const hashNumber = hashCode(value);
        const bucketIdx = hashNumber % BucketSize;
        const bucket = this.buckets[bucketIdx];

        return bucket.includes(value);
    }

    remove(value) {
        const hashNumber = hashCode(value);
        const bucketIdx = hashNumber % BucketSize;
        const bucket = this.buckets[bucketIdx];

        const found = bucket.remove(value);
        // only if the value was found; we update size
        if (found) {
            this.size--;
        }
    }

    get length() {
        return this.size;
    }
}

/**
 * Generates a int53 number hashCode for a given object.
 * @param {number} value 
 */
function hashCode(value) {
    const str = JSON.stringify(value);

    // https://stackoverflow.com/a/52171480/3538289
    const seed = 0;
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/**
 * Creates new fixed sized array, of given size. 
 */
function newFixedArray(size) {
    const array = new Array(size);
    array.fill(undefined);
    Object.seal(array);
    return array;
}

export default HashSet;