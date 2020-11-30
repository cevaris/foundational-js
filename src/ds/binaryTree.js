/**
 * Taken from https://www.baeldung.com/java-binary-tree
 */
export class BinaryTree {
    constructor() {
        this.root = null;
    }

    get length() {
        let size = 0;
        for (const _ of this) {
            size++;
        }
        return size;
    }

    add(value) {
        function _add(node, value) {
            if (node === null) {
                return new Node(value);
            }

            const state = comparator(value, node.value);
            if (state === State.LESS) {
                node.left = _add(node.left, value);
            }
            if (state === State.GREATER) {
                node.right = _add(node.right, value);
            }

            // found node with equal value
            return node;
        }

        this.root = _add(this.root, value);
    }

    contains(value) {
        function _contains(node, value) {
            if (node === null) {
                return false;
            }

            const state = comparator(value, node.value);
            if (state === State.EQUAL) {
                return true;
            }

            if (state === State.LESS) {
                return _contains(node.left, value);
            } else {
                return _contains(node.right, value);
            }
        }

        return _contains(this.root, value);
    }

    remove(value) {
        let deleted = false;
        function recursiveRemove(curr, value) {
            // leaf node, terminate navigation
            if (curr === null) {
                return null;
            }

            // console.log(value, curr.value, comparator(value, curr.value));
            const state = comparator(value, curr.value);
            if (state === State.EQUAL) {
                // found value, delete node and update children
                deleted = true;

                // leaf node, nothing to update.
                if (curr.left === null && curr.right === null) {
                    return null;
                }

                // left child is present only, upgrade node
                if (curr.right === null) {
                    return curr.left;
                }

                // right child is present only, upgrade node
                if (curr.left === null) {
                    return curr.right;
                }

                // left and right children are present
                // promote next highest value
                const smallestValue = findSmallestValue(curr.right);
                curr.value = smallestValue;
                curr.right = recursiveRemove(curr.right, smallestValue);
            }

            // have not found value yet, navigate to left child
            if (state === State.LESS) {
                curr.left = recursiveRemove(curr.left, value);
            }

            // have not found value yet, navigate to right child
            if (state === State.GREATER) {
                curr.right = recursiveRemove(curr.right, value);
            }

            return curr;
        }

        this.root = recursiveRemove(this.root, value);
        return deleted;
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

    toString() {
        return JSON.stringify(this, null, 3);
    }
}

/**
 * Comparison state.
 */
const State = {
    LESS: -1,
    EQUAL: 0,
    GREATER: 1
};

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/**
 * Given two values, stringify them and return a comparison number.
 * - a  <  b @returns {State.LESS}
 * - a === b @returns {State.EQUAL}
 * - a  >  b @returns {State.GREATER}
 * @param {*} a 
 * @param {*} b 
 */
function comparator(a, b) {
    const left = JSON.stringify(a);
    const right = JSON.stringify(b);

    if (left === right) {
        return State.EQUAL;
    }

    return left < right ? State.LESS : State.GREATER;
}

function findSmallestValue(node) {
    return node.left === null ? node.value : findSmallestValue(node.left);
}

export default BinaryTree;