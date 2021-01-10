const { BinaryTree, Order } = require('../../src/ds/binaryTree');
// const { BinaryTree } = require('../ds/binaryTree.js');

test('create empty BinaryTree', () => {
    const binaryTree = new BinaryTree();
    expect(binaryTree.length).toBe(0);
});

test('add number elements to BinaryTree', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add(100);
    binaryTree.add(50);
    binaryTree.add(75)
    binaryTree.add(60);
    binaryTree.add(25);

    expect(binaryTree.length).toBe(5);
});

test('add elements to BinaryTree', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('c');
    binaryTree.add('b');
    binaryTree.add('a');

    expect(binaryTree.length).toBe(3);
});

test('contains elements in BinaryTree', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('c');
    binaryTree.add('b');
    binaryTree.add('a');
    binaryTree.add([1]);
    binaryTree.add({ x: { y: 1 } });

    expect(binaryTree.contains(3)).toBeFalsy();
    expect(binaryTree.contains('c')).toBe(true);
    expect(binaryTree.contains('b')).toBe(true);
    expect(binaryTree.contains('a')).toBe(true);
    expect(binaryTree.contains([1])).toBe(true);
    expect(binaryTree.contains({ x: { y: 1 } })).toBe(true);
});

test('can remove value from leaf node of a BinaryTree', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('c');
    binaryTree.add('b');
    binaryTree.add('a');
    binaryTree.add({ x: { y: 1 } });

    // remove value that is not present
    expect(binaryTree.remove(3)).toBeFalsy();

    // remove complex value
    expect(binaryTree.remove({ x: { y: 1 } })).toBeTruthy();

    expect(binaryTree.contains('a')).toBeTruthy();
    expect(binaryTree.contains('b')).toBeTruthy();
    expect(binaryTree.contains('c')).toBeTruthy();
});

test('can remove node with two children', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('1');
    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('2');
    binaryTree.add('4');

    expect(binaryTree.remove('3')).toBeTruthy();

    expect(binaryTree.contains('3')).toBeFalsy();
    expect(binaryTree.contains('5')).toBeTruthy();
    expect(binaryTree.contains('1')).toBeTruthy();
    expect(binaryTree.contains('2')).toBeTruthy();
    expect(binaryTree.contains('4')).toBeTruthy();
});

test('can remove node with right children only', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('1');
    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('2');
    binaryTree.add('4');

    expect(binaryTree.remove('5')).toBeTruthy();

    expect(binaryTree.contains('5')).toBeFalsy();
    expect(binaryTree.contains('1')).toBeTruthy();
    expect(binaryTree.contains('3')).toBeTruthy();
    expect(binaryTree.contains('2')).toBeTruthy();
    expect(binaryTree.contains('4')).toBeTruthy();
});


test('can remove node with left children only', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('4');

    expect(binaryTree.remove('5')).toBeTruthy();

    expect(binaryTree.contains('5')).toBeFalsy();
    expect(binaryTree.contains('4')).toBeTruthy();
    expect(binaryTree.contains('3')).toBeTruthy();
});


test('iterator in IN_ORDER', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('1');
    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('2');
    binaryTree.add('4');

    const array = Array.from(binaryTree.iterator(Order.IN_ORDER));
    expect(array).toStrictEqual(['1', '2', '3', '4', '5']);
});

test('iterator in PRE_ORDER', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('1');
    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('2');
    binaryTree.add('4');

    const array = Array.from(binaryTree.iterator(Order.PRE_ORDER));
    expect(array).toStrictEqual(['1', '5', '3', '2', '4']);
});

test('iterator in POST_ORDER', () => {
    const binaryTree = new BinaryTree();

    binaryTree.add('1');
    binaryTree.add('5');
    binaryTree.add('3');
    binaryTree.add('2');
    binaryTree.add('4');

    const array = Array.from(binaryTree.iterator(Order.POST_ORDER));
    expect(array).toStrictEqual(['5', '3', '2', '4', '1']);
});