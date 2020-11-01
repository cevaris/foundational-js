import { HashSet } from "../../src/ds/hashSet";

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