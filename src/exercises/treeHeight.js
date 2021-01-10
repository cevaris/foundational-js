const { BinaryTree } = require('../ds/binaryTree.js');

/**
 * Calculate the height of a BinaryTree.
 */

const tree = new BinaryTree();
tree.add(5)
tree.add(4)
tree.add(3)
tree.add(1)

function height(node) {
    if (node === null || node === undefined) {
        return 0;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

// https://www.geeksforgeeks.org/write-a-c-program-to-find-the-maximum-depth-or-height-of-a-tree/
console.log(JSON.stringify(tree, null, 3))
console.log(height(tree.root))