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

    /**
     * Adds value to end of linked list.
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
        if(curr === null) {
            return false;
        }

        // found value match in `curr`; 
        // update prev.next to skip over `curr`
        prev.next = curr.next;
        return true;
    }

    filter(predicate) { }
    map(func) { }

    /**
     * Defines an iterator such that callers can easily iterate over LinkedList.
     * ex. 
     * 
     * for (const e of list) {
     *    console.log(e);
     * }
     */
    [Symbol.iterator]() {
        let node = this.head;
        return {
            next() {
                if (node && node.next) {
                    const value = node.value;
                    node = node.next;
                    return { value: value, done: false };
                } else if (node) {
                    const value = node.value;
                    node = node.next;
                    return { value: value, done: false };
                } else {
                    return { value: null, done: true };
                }
            }
        }
    }

    toString() {
        const arr = [];

        for (const e of this) {
            arr.push(e);
        }

        return `LinkedList(${arr.join(',')})`;
    }
}