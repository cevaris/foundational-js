const Vector = require('../../src/ds/vector');

test('create empty Vector', () => {
    const v = new Vector();
    expect(v.length).toBe(0);
});

test('insert elements into vector', () => {
    const v = new Vector();

    v.push('a');
    expect(v.length).toBe(1);

    v.push('b');
    expect(v.length).toBe(2);
});

test('insert elements into vector to force resize', () => {
    const v = new Vector();
    for (let i = 0; i < 15; i++) {
        v.push(i);
    }
    expect(v.length).toBe(15);
});

test('insert into vector and get elements ', () => {
    const v = new Vector();

    v.push('a');
    v.push('b');
    
    expect(v.get(0)).toBe('a');
    expect(v.get(1)).toBe('b');
});