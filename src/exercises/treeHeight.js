const { BinaryTree } = require('../ds/binaryTree.js');

/**
 * Calculate the height of a BinaryTree.
 */

let tree = new BinaryTree();
tree.add(5);
tree.add(4);
tree.add(3);
tree.add(1);
console.log(height(tree.root)) // 4

tree = new BinaryTree();
console.log(height(tree.root)) // 0

tree = new BinaryTree();
tree.add(5);
tree.add(3);
tree.add(6);
tree.add(1);
console.log(height(tree.root)) // 3

tree = new BinaryTree();
tree.add(5);
console.log(height(tree.root)) // 1


function height(node) {
    if (node === null || node === undefined) {
        return 0;
    }

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

