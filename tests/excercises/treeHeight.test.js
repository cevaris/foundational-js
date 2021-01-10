/**
 * Calculate the height/level of a binary search tree.
 * Note: Feel free to draw the trees out to help you understand.
 */

const { BinaryTree } = require('../../src/ds/binaryTree');

test('returns correct height', () => {
    const tree = new BinaryTree();
    const data = [5, 4, 3, 1, 50, 49];
    data.forEach(e => tree.add(e));

    expect(treeHeight(tree.root)).toBe(4);
});

test('returns correct height when inner nodes is longest', () => {
    const tree = new BinaryTree();
    const data = [50, 75, 100, 90, 95];
    data.forEach(e => tree.add(e));

    expect(treeHeight(tree.root)).toBe(5);
});

test('returns correct height left and right are equal height', () => {
    const tree = new BinaryTree();
    const data = [5, 2, 1, 6, 7];
    data.forEach(e => tree.add(e));

    expect(treeHeight(tree.root)).toBe(3);
});

test('returns 0 for empty tree', () => {
    const tree = new BinaryTree();
    expect(treeHeight(tree.root)).toBe(0);
});

test('returns 1 for tree with single node', () => {
    const tree = new BinaryTree();
    tree.add(3);
    expect(treeHeight(tree.root)).toBe(1);
});

function treeHeight(node) {
    if (node === null) {
        return 0;
    }

    const leftHeight = treeHeight(node.left);
    const rightHeight = treeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
}

