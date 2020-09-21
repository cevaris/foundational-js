import Vector from '../../src/ds/vector';

test('create empty Vector', () => {
    const v = new Vector();
    expect(v.size).toBe(0);
});

test('push elements into vector', () => {
    const v = new Vector();

    v.push('a');
    expect(v.size).toBe(1);

    v.push('b');
    expect(v.size).toBe(2);
});

test('push elements into vector to force resize', () => {
    const v = new Vector();
    for (let i = 0; i < 15; i++) {
        v.push(i);
    }
    expect(v.size).toBe(15);
});

test('push into vector and get elements', () => {
    const v = new Vector();

    v.push('a');
    v.push('b');

    expect(v.get(0)).toBe('a');
    expect(v.get(1)).toBe('b');
});

test('iterate over Vector', () => {
    const v = new Vector();

    const data = {
        0: 'a',
        1: 'b',
        2: 'c',
    };

    v.push('a');
    v.push('b');
    v.push('c');

    let index = 0;

    // Note: we have to use `of` keyword here to iterate over Vector
    // https://stackoverflow.com/a/29286412/3538289
    for (const e of v) {
        expect(e).toBe(data[index]);
        index++;
    }
});