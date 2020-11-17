export class BinaryTree {
    /**
     * @param comparator Function that returns -1=less, 0=equal, 1=greater
     */
    constructor(comparator) {
        this.root = null;
        this.comparator = comparator || defaultComparator;
    }

    get length() {
        let size = 0;
        for (const _ of this) {
            size++;
        }
        return size;
    }

    add(value) {
        this.root = this._add(this.root, value);
    }

    /**
     * private method
     * @param {*} node 
     * @param {*} value 
     */
    _add(node, value) {
        if (node === null) {
            return new Node(value);
        }

        const state = this.comparator(value, node.value);
        //console.log(state, value, node.value);
        if (state === -1) {
            node.left = this._add(node.left, value);
        } else if (state === 1) {
            node.right = this._add(node.right, value);
        } else {
            // value already exists
            return node;
        }

        return node;
    }

    *iterator() {
        function* inOrder(node) {
            if (node !== null) {
                yield* inOrder(node.left);
                yield node.value;
                yield* inOrder(node.right);
            }
        }

        yield* inOrder(this.root);
    }

    /**
     * Defines an iterator such that callers can easily iterate over LinkedList.
     * ex. 
     * 
     * for (const e of list) {
     *    console.log(e);
     * }
     */
    [Symbol.iterator]() {
        return this.iterator();
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function defaultComparator(a, b) {
    if (a < b) {
        return -1; // left is less than right
    } else if (a > b) {
        return 1;  // left is greater than right
    } else {
        return 0;  // equal to
    }
}

export default BinaryTree;