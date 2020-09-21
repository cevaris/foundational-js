import { Vector, VECTOR_INIT_LENGTH } from '../../src/ds/vector';

test('create empty Vector', () => {
    const vector = new Vector();
    expect(vector.length).toBe(0);
});

test('push elements into vector', () => {
    const vector = new Vector();

    expect(vector.push('a')).toBe(0);
    expect(vector.push('b')).toBe(1);

    expect(Array.from(vector)).toStrictEqual(['a', 'b']);
});

test('set elements into vector', () => {
    const vector = new Vector();

    vector.set(0, 'a');
    expect(vector.get(0)).toBe('a');

    vector.set(1, 'b');
    expect(vector.get(1)).toBe('b');
});

test('pop elements from a vector', () => {
    const vector = new Vector();

    // pop on empty Vector
    expect(vector.pop()).toBe(undefined);

    vector.push('a');
    vector.push('b');

    expect(vector.pop()).toBe('b');
    expect(vector.pop()).toBe('a');

    // verify all elements popped
    expect(vector.pop()).toBe(undefined);
});

test('filter vector elements', () => {
    const vector = new Vector();
    for (let i = 0; i < 10; i++) {
        vector.push(i);
    }
    const result = vector.filter((a) => a % 2 == 0);

    expect(Array.from(result)).toStrictEqual([0, 2, 4, 6, 8]);
});

test('push into vector and get elements', () => {
    const vector = new Vector();

    vector.push('a');
    vector.push('b');

    expect(vector.get(0)).toBe('a');
    expect(vector.get(1)).toBe('b');
});

test('iterate over Vector', () => {
    const vector = new Vector();

    const data = {
        0: 'a',
        1: 'b',
        2: 'c',
    };

    vector.push('a');
    vector.push('b');
    vector.push('c');

    let index = 0;

    for (const e of vector) {
        expect(e).toBe(data[index]);
        index++;
    }
});