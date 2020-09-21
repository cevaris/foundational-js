import Vector from '../../src/ds/vector';

test('create empty Vector', () => {
    const vector = new Vector();
    expect(vector.size).toBe(0);
});

test('push elements into vector', () => {
    const vector = new Vector();

    vector.push('a');
    expect(vector.size).toBe(1);

    vector.push('b');
    expect(vector.size).toBe(2);
});

test('set elements into vector', () => {
    const vector = new Vector();

    vector.set(0, 'a');
    expect(vector.get(0)).toBe('a');

    vector.set(1, 'b');
    expect(vector.get(1)).toBe('b');

    vector.set(15, 'c');
    expect(vector.get(15)).toBe('c');
});

test('push elements into vector to force resize', () => {
    const vector = new Vector();
    for (let i = 0; i < 15; i++) {
        vector.push(i);
    }
    expect(vector.size).toBe(15);
});

test('pop elements from a vector', () => {
    const vector = new Vector();

    vector.push('a');
    vector.push('b');

    expect(vector.pop()).toBe('b');
    expect(vector.pop()).toBe('a');
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

    // Note: we have to use `of` keyword here to iterate over Vector
    // https://stackoverflow.com/a/29286412/3538289
    for (const e of vector) {
        expect(e).toBe(data[index]);
        index++;
    }
});