import { LinkedList } from '../../src/ds/linkedList';

test('create empty LinkedList', () => {
    const list = new LinkedList();
    expect(list.length).toBe(0);
});

test('add elements into LinkedList', () => {
    const list = new LinkedList();

    expect(list.add('a')).toBe(1);
    expect(list.add('b')).toBe(2);

    expect(Array.from(list)).toStrictEqual(['a', 'b']);
});

test('toString elements of a LinkedList', () => {
    const list = new LinkedList();
    expect(list.toString()).toStrictEqual('LinkedList()');

    expect(list.add('a')).toBe(1);
    expect(list.add('b')).toBe(2);

    expect(list.toString()).toStrictEqual('LinkedList(a,b)');
});

test('remove elements from  LinkedList', () => {
    const list = new LinkedList();

    list.add('a');
    list.add('b');
    list.add('b');
    list.add('c');

    // no-op if value not found
    expect(list.remove('z')).toBe(false);
    expect(Array.from(list)).toStrictEqual(['a', 'b', 'b', 'c']);

    // remove first occurrence only
    expect(list.remove('b')).toBe(true);
    expect(Array.from(list)).toStrictEqual(['a', 'b','c']);

    // remove from middle of list
    expect(list.remove('b')).toBe(true);
    expect(Array.from(list)).toStrictEqual(['a', 'c']);

    // remove from end of list
    expect(list.remove('c')).toBe(true);
    expect(Array.from(list)).toStrictEqual(['a']);

    // remove from front of list
    expect(list.remove('a')).toBe(true);
    expect(Array.from(list)).toStrictEqual([]);

    // remove when list is empty
    expect(list.remove('z')).toBe(false);
    expect(Array.from(list)).toStrictEqual([]);
});