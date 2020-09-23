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
    list.add('c');

    expect(list.remove('z')).toBe(false);
    expect(Array.from(list)).toStrictEqual(['a', 'b', 'c']);

    expect(list.remove('b')).toBe(true);
    expect(Array.from(list)).toStrictEqual(['a', 'c']);

    expect(list.remove('c')).toBe(true);
    expect(Array.from(list)).toStrictEqual(['a']);

    expect(list.remove('a')).toBe(true);
    expect(Array.from(list)).toStrictEqual([]);

    expect(list.remove('z')).toBe(false);
    expect(Array.from(list)).toStrictEqual([]);
});