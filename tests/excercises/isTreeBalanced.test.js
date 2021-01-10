/**
 * Check if a BinaryTree is balanced. 
 * A binary tree is balanced if every internal node has both 
 * a left and right node, with the exception of leaf nodes. 
 * 
 * Return true if balanced, false if not.
 */

const { BinaryTree } = require('../../src/ds/binaryTree');


test('returns true for balanced tree', () => {
    const tree = new BinaryTree();
    const data = [100, 50, 150, 75, 25, 175, 125];
    data.forEach(e => tree.add(e));

    expect(isTreeBalanced(tree)).toBe(true);
});

test('returns false for imbalanced tree, 1,2,3', () => {
    const tree = new BinaryTree();
    const data = [1, 2, 3];
    data.forEach(e => tree.add(e));

    expect(isTreeBalanced(tree)).toBe(false);
});

test('returns false for imbalanced tree, 3,2,5,4', () => {
    const tree = new BinaryTree();
    const data = [3, 2, 5, 4];
    data.forEach(e => tree.add(e));

    expect(isTreeBalanced(tree)).toBe(false);
});

test('returns true for empty tree', () => {
    const tree = new BinaryTree();
    expect(isTreeBalanced(tree)).toBe(true);
});

test('returns true for tree with 1 node', () => {
    const tree = new BinaryTree();
    expect(isTreeBalanced(tree)).toBe(true);
});

function isTreeBalanced(tree) {
    function loop(node) {
        if (!node.left && !node.right) {
            // leaf node, return true
            return true;
        }

        if (node.left && node.right) {
            // internal node with both children present
            return loop(node.left) && loop(node.right);
        }

        // node is imbalanced, return false
        return false;
    }

    if (!tree || !tree.root) {
        return true; // empty tree is balanced
    }
    return loop(tree.root);
}