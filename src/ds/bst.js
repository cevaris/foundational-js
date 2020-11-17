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
        const self = this;

        function _add(node, value) {
            if (node === null) {
                return new Node(value);
            }

            const state = self.comparator(value, node.value);
            if (state === -1) {
                node.left = _add(node.left, value);
            } else if (state === 1) {
                node.right = _add(node.right, value);
            } else {
                // value already exists
                return node;
            }

            return node;
        }

        this.root = _add(this.root, value);
    }

    contains(value) {
        const self = this;
        function _contains(node, value) {
            if (node === null) {
                return false;
            }

            const state = self.comparator(value, node.value);
            if (state === 0) {
                return true;
            } else if (state === -1) {
                return _contains(node.left, value);
            } else {
                return _contains(node.right, value);
            }
        }

        return _contains(this.root, value);
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
    if (a === b) {
        return 0;  // equal to
    }

    return (a < b) ? -1 : 1;
}

export default BinaryTree;