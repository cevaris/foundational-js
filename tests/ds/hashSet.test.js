const { HashSet } = require("../../src/ds/hashSet");

test('create empty HashSet', () => {
    const set = new HashSet();
    expect(set.length).toBe(0);
});

test('add to HashSet', () => {
    const set = new HashSet();
    set.add({ '33': 'apples' });
    set.add(33);
    set.add(true);
    set.add('duplicate');
    set.add('duplicate'); // not counted

    expect(set.length).toBe(4);
});

test('remove from HashSet', () => {
    const set = new HashSet();
    set.add('1');
    set.add('2');
    set.add('3');

    expect(set.length).toBe(3);

    set.remove('does not exist');
    expect(set.length).toBe(3);

    set.remove('1');
    expect(set.length).toBe(2);

    set.remove('2');
    expect(set.length).toBe(1);

    set.remove('3');
    expect(set.length).toBe(0);
});

test('includes from HashSet', () => {
    const set = new HashSet();
    set.add('1');
    set.add('2');
    set.add('3');

    expect(set.includes('1')).toBeTruthy();
    expect(set.includes('2')).toBeTruthy();
    expect(set.includes('3')).toBeTruthy();
    expect(set.includes('does not exist')).toBeFalsy();
});

test('iterate over HashSet', () => {
    const set = new HashSet();

    const data = [];
    for (let i = 0; i < 1000; i++) {
        data.push(i);
        set.add(i);
    }

    for (const value of set) {
        expect(data.includes(value)).toBeTruthy();

        // remove from data to mark as seen
        const index = data.findIndex(v => v === value);
        if (index > -1) {
            data.splice(index, 1);
        }
    }

    expect(data.length === 0).toBeTruthy();
});
