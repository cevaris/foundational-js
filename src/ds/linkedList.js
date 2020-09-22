class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

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
        } else {
            let temp = this.head;
            while (temp.next !== null) {
                temp = temp.next;
            }
            temp.next = node;
        }

        return this.length;
    }

    remove(value) { }
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