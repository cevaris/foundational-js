const InitialBucketSize = 10;
const ResizeLoadFactor = 0.75;

export class HashMap {
    constructor(bucketSize = InitialBucketSize) {
        // Using a fixed array for the table to prevent resizing
        // Otherwise we can accidentally break the modulo mapping.
        this.bucketSize = bucketSize;
        this.buckets = newFixedArray(bucketSize);

        this.buckets.forEach((_, i) => this.buckets[i] = new Array());
        this.size = 0;
    }

    put(key, value) {
        this._maybeResize();
        const bucket = this._getBucket(key);
        const kv = keyValue(key, value);

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                // duplicate key found, overwrite value
                bucket[i] = kv;
                return;
            }
        };

        // no duplicate key found, add new key value
        bucket.push(kv);
        this.size++;
    }

    includes(key) {
        const bucket = this._getBucket(key);
        return bucket.some(kv => kv.key === key);
    }

    get(key) {
        const bucket = this._getBucket(key);
        const foundKV = bucket.find(kv => kv.key === key);
        if (foundKV) {
            return foundKV.value;
        } else {
            return null;
        }
    }

    remove(key) {
        const bucket = this._getBucket(key);
        const foundKV = bucket.find(kv => kv.key === key);

        if (foundKV) {
            var index = bucket.indexOf(foundKV);
            if (index > -1) bucket.splice(index, 1);
            // bucket.remove(foundKV);
            this.size--;
        }
    }

    get length() {
        return this.size;
    }

    [Symbol.iterator]() {
        let bucketIdx = 0;
        let buckets = this.buckets;
        let bucketIter = buckets[bucketIdx].iterator;

        return {
            next: function () {
                if (!bucketIter) {
                    return { value: null, done: true }
                } else if (!bucketIter.done) {
                    return bucketIter;
                } else {
                    bucketIter = buckets[++bucketIdx].iterator;
                    return bucketIter;
                }
            }
        }
    }

    _getBucket(value) {
        const hashNumber = hashCode(value);
        const bucketIdx = hashNumber % InitialBucketSize;
        return this.buckets[bucketIdx];
    }

    _maybeResize() {
        const loadFactor = this.bucketSize * ResizeLoadFactor;
        if (this.size > loadFactor) {
            const newBucketSize = this.size * 2;
            const newBuckets = newFixedArray(newBucketSize);
            newBuckets.forEach((_, i) => newBuckets[i] = new Array());

            for (const e of this) {
                const hashNumber = hashCode(e);
                const bucketIdx = hashNumber % InitialBucketSize;
                const bucket = newBucketSize[bucketIdx];
                bucket.push(value);
            }

            this.buckets = newBuckets;
            this.bucketSize = newBucketSize;
        }
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

function keyValue(key, value) {
    return { key: key, value: value };
}

export default HashMap;