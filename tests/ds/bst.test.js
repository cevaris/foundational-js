import { BinaryTree } from '../../src/ds/bst';

test('create empty BinaryTree', () => {
    const bst = new BinaryTree();
    expect(bst.length).toBe(0);
});

test('add elements to BinaryTree', () => {
    const bst = new BinaryTree();

    bst.add('c');
    bst.add('b');
    bst.add('a');

    expect(bst.length).toBe(3);
});

