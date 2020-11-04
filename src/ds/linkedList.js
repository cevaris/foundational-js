class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

/**
 * Java based LinkedList
 * https://docs.oracle.com/javase/7/docs/api/java/util/LinkedList.html 
 */
export class LinkedList {
    constructor() {
        this.head = null;
    }

    get length() {
        let count = 0;
        for (const e of this) {
            count++;
        }
        return count;
    }

    set(index, value) {
        let currIndex = 0;
        let temp = this.head;
        // while list is non-empty and current node is defined
        while (this.head && temp) {
            // if current index matches target index
            if (currIndex === index) {
                // save and return previous value
                // update to the new value.
                const prevValue = temp.value;
                temp.value = value;
                return prevValue;
            }

            currIndex++;
            temp = temp.next;
        }

        // provided index did not exist (list is too small)
        throw new Error(`IndexOutOfBounds ${index}`);
    }

    get(index) {
        let currIndex = 0;
        for (const e of this) {
            if (currIndex === index) {
                return e;
            }
            currIndex++;
        }
        throw new Error(`IndexOutOfBounds ${index}`);
    }

    /**
     * Adds value to end of linked list.
     * Returns new length.
     */
    add(value) {
        const node = new Node(value);

        if (this.head === null) {
            this.head = node;
            return 1;
        }

        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = node;

        return this.length;
    }

    /**
     * Removes first occurrence of value.
     * If value does not exist, returns false;
     * If value is removed, returns true;
     */
    remove(value) {
        // if first item is the value we are looking for
        if (this.head && this.head.value === value) {
            this.head = this.head.next;
            return true;
        }

        // search for the previous `prev` node that matches value
        let prev = null;
        let curr = this.head;
        while (curr && curr.value !== value) {
            prev = curr;
            curr = curr.next;
        }

        // did not find a value match, nothing to delete
        if (curr === null) {
            return false;
        }

        // found value match in `curr`; 
        // update prev.next to skip over `curr`
        prev.next = curr.next;
        return true;
    }

    includes(value) {
        let found = false;
        for (const e of this) {
            found = found || e === value;
        }
        return found;
    }

    filter(predicate) { }
    map(func) { }

    *iterator() {
        let temp = this.head;
        while (temp && temp.next) {
            yield temp.value;
            temp = temp.next;
        }

        // capture the last node if non-null
        if (temp) {
            yield temp.value;
        }
    }

    // /**
    //  * Defines an iterator such that callers can easily iterate over LinkedList.
    //  * ex. 
    //  * 
    //  * for (const e of list) {
    //  *    console.log(e);
    //  * }
    //  */
    [Symbol.iterator]() {
        return this.iterator();
    }

    toString() {
        const arr = [];
        for (const e of this) {
            arr.push(e);
        }
        return `LinkedList(${arr.join(',')})`;
    }
}