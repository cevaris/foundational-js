const ResizeLoadFactor = 0.75;

class HashMap {
    constructor(bucketSize) {
        // Using a fixed array for the table to prevent resizing
        // Otherwise we can accidentally break the modulo mapping.
        this.buckets = newFixedArray(bucketSize || 15);
        // initialize empty arrays per bucket
        this.buckets.forEach((_, i) => this.buckets[i] = new Array());
        this.numOfKeyValues = 0;
    }

    put(key, value) {
        this._maybeResize();

        const bucket = this._getBucket(key);
        const kv = keyValue(key, value);
        const keyStr = JSON.stringify(key);

        for (let i = 0; i < bucket.length; i++) {
            if (JSON.stringify(bucket[i].key) === keyStr) {
                // duplicate key found, overwrite value
                bucket[i] = kv;
                return;
            }
        };

        // no duplicate key found, add new key value
        bucket.push(kv);
        this.numOfKeyValues++;
    }

    includes(key) {
        const bucket = this._getBucket(key);
        // if some key found a bucket, return true
        const keyStr = JSON.stringify(key);
        return bucket.some(kv => JSON.stringify(kv.key) === keyStr);
    }

    get(key) {
        const bucket = this._getBucket(key);
        const keyStr = JSON.stringify(key);
        const foundKV = bucket.find(kv => JSON.stringify(kv.key) === keyStr);
        if (foundKV) {
            // key found in bucket, return value
            return foundKV.value;
        } else {
            return null;
        }
    }

    remove(key) {
        const bucket = this._getBucket(key);
        const foundKV = bucket.find(kv => kv.key === key);

        if (foundKV) {
            // key found in bucket, remove
            var index = bucket.indexOf(foundKV);
            if (index > -1) bucket.splice(index, 1);
            this.numOfKeyValues--;
        }
    }

    get length() {
        return this.numOfKeyValues;
    }

    *iterator() {
        for (let b = 0; b < this.buckets.length; b++) {
            for (let bi = 0; bi < this.buckets[b].length; bi++) {
                yield this.buckets[b][bi];
            }
        }
        return this.numOfKeyValues;
    }

    [Symbol.iterator]() {
        return this.iterator();
    }

    _getBucket(value) {
        const hashNumber = hashCode(value);
        const bucketIdx = hashNumber % this.buckets.length;
        return this.buckets[bucketIdx];
    }

    /**
     * Resize the map if the map loadFactor threshold is passed.
     * Note: on a resize, the numOfKeyValues stays the same.
     */
    _maybeResize() {
        const loadFactor = this.buckets.length * ResizeLoadFactor;
        if (this.numOfKeyValues > loadFactor) {
            const newBucketSize = this.buckets.length * 2;
            const newBuckets = newFixedArray(newBucketSize);
            newBuckets.forEach((_, i) => newBuckets[i] = new Array());

            // Copy over previously inserted keyValues into the new, larger newBuckets.
            for (const kv of this) {
                const newHashNumber = hashCode(kv.key);
                const newBucketIdx = newHashNumber % newBucketSize;
                newBuckets[newBucketIdx].push(kv);
            }

            this.buckets = newBuckets;
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

exports.HashMap = HashMap;