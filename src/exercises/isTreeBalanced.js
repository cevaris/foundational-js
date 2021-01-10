const { BinaryTree } = require("../ds/binaryTree")

/**
 * Check if a BinaryTree is balanced. 
 * A binary tree is balanced if every internal node has both 
 * a left and right node, with the exception of leaf nodes. 
 * 
 * Return true if balanced, False if not.
 */

let tree = new BinaryTree();
[5, 4, 6].forEach(e => tree.add(e));
console.log(isTreeBalanced(tree)); // true


tree = new BinaryTree();
[1, 2, 3].forEach(e => tree.add(e));
console.log(isTreeBalanced(tree)); // false


tree = new BinaryTree();
[100, 50, 150, 75, 25, 175, 125].forEach(e => tree.add(e));
console.log(isTreeBalanced(tree)); // true

tree = new BinaryTree();
console.log(isTreeBalanced(tree)); // true

function isTreeBalanced(tree) {
    function loop(node) {
        if (!node.left && !node.right) {
            return true;
        }

        if (node.left && node.right) {
            return loop(node.left) && loop(node.right);
        }

        // console.log(node);
        return false;
    }

    if (!tree || !tree.root) {
        return true; // empty tree is balanced
    }
    return loop(tree.root);
}