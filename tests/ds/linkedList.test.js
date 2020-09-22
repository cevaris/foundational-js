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

    expect(list.add('a')).toBe(1);
    expect(list.add('b')).toBe(2);

    expect(list.toString()).toStrictEqual('LinkedList(a,b)');
});