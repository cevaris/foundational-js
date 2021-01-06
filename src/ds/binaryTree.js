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
        function recursiveAdd(node, value) {
            if (node === null) {
                return new Node(value);
            }

            const state = comparator(value, node.value);
            if (state === State.LESS) {
                node.left = recursiveAdd(node.left, value);
            }
            if (state === State.GREATER) {
                node.right = recursiveAdd(node.right, value);
            }

            // found node with equal value
            return node;
        }

        this.root = recursiveAdd(this.root, value);
    }

    contains(value) {
        function recursiveContains(node, value) {
            if (node === null) {
                return false;
            }

            const state = comparator(value, node.value);
            if (state === State.EQUAL) {
                return true;
            }

            if (state === State.LESS) {
                return recursiveContains(node.left, value);
            } else {
                return recursiveContains(node.right, value);
            }
        }

        return recursiveContains(this.root, value);
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

    *iterator(order) {
        switch (order) {
            case Order.PRE_ORDER:
                yield* this.preOrder(this.root);
                break;
            case Order.POST_ORDER:
                yield* this.postOrder(this.root);
                break;
            case Order.IN_ORDER:
            default:
                yield* this.inOrder(this.root);
                break;
        }
    }

    *inOrder(node) {
        if (node !== null) {
            yield* this.inOrder(node.left);
            yield node.value;
            yield* this.inOrder(node.right);
        }
    }

    *preOrder(node) {
        if (node !== null) {
            yield node.value;
            yield* this.preOrder(node.left);
            yield* this.preOrder(node.right);
        }
    }

    *postOrder(node) {
        if (node !== null) {
            yield* this.preOrder(node.left);
            yield* this.preOrder(node.right);
            yield node.value;
        }
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

/**
 * BinaryTree traversal order
 */
export const Order = {
    IN_ORDER: Symbol('IN_ORDER'),
    PRE_ORDER: Symbol('PRE_ORDER'),
    POST_ORDER: Symbol('POST_ORDER'),
    LEVEL_ORDER: Symbol('LEVEL_ORDER')
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
 * If an value is an object, we first stringify the object. 
 * If a scalar value, we use built-in comparison logic.
 * - a  <  b @returns {State.LESS}
 * - a === b @returns {State.EQUAL}
 * - a  >  b @returns {State.GREATER}
 * @param {*} a 
 * @param {*} b 
 */
function comparator(a, b) {
    const left = a instanceof Object ? JSON.stringify(a) : a;
    const right = b instanceof Object ? JSON.stringify(b) : b;

    if (left === right) {
        return State.EQUAL;
    }

    return left < right ? State.LESS : State.GREATER;
}

function findSmallestValue(node) {
    return node.left === null ? node.value : findSmallestValue(node.left);
}

export default BinaryTree;