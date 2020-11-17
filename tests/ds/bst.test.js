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

test('contains elements in BinaryTree', () => {
    const bst = new BinaryTree(deepComparator);

    bst.add('c');
    bst.add('b');
    bst.add('a');
    bst.add([1]);
    bst.add({ x: { y: 1 } });

    expect(bst.contains(3)).toBeFalsy();
    expect(bst.contains('c')).toBeTruthy();
    expect(bst.contains('b')).toBeTruthy();
    expect(bst.contains('a')).toBeTruthy();
    expect(bst.contains([1])).toBeTruthy();
    expect(bst.contains({ x: { y: 1 } })).toBeTruthy();
});

function deepComparator(a, b) {
    const left = JSON.stringify(a);
    const right = JSON.stringify(b);

    if (left === right) {
        return 0;
    }

    return left < right ? -1 : 1;
}