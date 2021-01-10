// NOT COMPLETED: ended up being too complicated....

const { BinaryTree } = require("../ds/binaryTree");

/**
 * Given a list of numbers, what is the next smallest and 
 * largest values?
 * 
 * Note, these numbers will be added/removed frequently 
 * over time.
 */

const numbers = [0, 2, 99, 100, 102, 3, 50]

// expected responses for "numbers" array 
// Nearest values of 2, [0, 3]
// Nearest values of 99, [50, 100]
// Nearest values of -1, [null, 0] (nothing smaller than -1)
// Nearest values of 0, [null, 2] (nothing smaller than 0)
// Nearest values of 102, [100, null] (nothing larger than 102)

console.log(nearest(numbers, 2));
console.log(nearest(numbers, 99));
console.log(nearest(numbers, -1));
console.log(nearest(numbers, 0));
console.log(nearest(numbers, 102));


const tree = new BinaryTree();
numbers.forEach(e => tree.add(e));
console.log(JSON.stringify(tree.root, null, 3));

function nearest(numbers, value) {
    const tree = new BinaryTree();
    numbers.forEach(e => tree.add(e));

    function nextSmallest(node) {
        return node.left === null ? node.value : nextSmallest(node.left);
    }
    function nextLargest(node) {
        return node.right === null ? node.value : nextLargest(node.right);
    }

    function loop(node) {
        if (!node) {
            return null;
        }

        if (value === node.value) {
            if (node.left && node.right) {
                return [nextLargest(node.left), nextSmallest(node.right)];
            }

            if (node.left) {
                return [nextLargest(node.left), null];
            }

            if (node.right) {
                return [null, nextSmallest(node.right)]
            }
        }

        if (value < node.value) {
            return loop(node.left, value);
        }

        if (value > node.value) {
            return loop(node.right, value);
        }
    }

    // console.log(JSON.stringify(tree.root, null, 3));

    const node = tree.root;
    if (node == null) {
        return null; // empty tree
    }
    return loop(node);
}

