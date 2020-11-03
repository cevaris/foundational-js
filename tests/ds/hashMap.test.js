import { HashMap } from "../../src/ds/hashMap";

test('create empty HashMap', () => {
    const map = new HashMap();
    expect(map.length).toBe(0);
});

test('add to HashMap', () => {
    const map = new HashMap();
    map.put({ '33': 'apples' }, '1');
    map.put(33, '2');
    map.put(true, '3');
    map.put('duplicate', 5);
    map.put('duplicate', 6); // not counted, but overwritten

    expect(map.length).toBe(4);

    // verify duplicate insertion has latest value
    expect(map.get('duplicate')).toBe(6);
});

test('remove from HashMap', () => {
    const map = new HashMap();
    map.put('1', 'a');
    map.put('2', 'b');
    map.put('3', 'c');

    expect(map.length).toBe(3);

    map.remove('does not exist');
    expect(map.length).toBe(3);

    map.remove('1');
    expect(map.length).toBe(2);

    map.remove('2');
    expect(map.length).toBe(1);

    map.remove('3');
    expect(map.length).toBe(0);
});

test('includes from HashMap', () => {
    const map = new HashMap();
    map.put('1', 'a');
    map.put('2', 'b');
    map.put('3', 'c');

    expect(map.includes('1')).toBeTruthy();
    expect(map.includes('2')).toBeTruthy();
    expect(map.includes('3')).toBeTruthy();
    expect(map.includes('does not exist')).toBeFalsy();
});

test('get from HashMap', () => {
    const map = new HashMap();
    map.put('1', 'a');
    map.put('2', 'b');
    map.put('3', 'c');

    expect(map.get('1')).toBe('a');
    expect(map.get('2')).toBe('b');
    expect(map.get('3')).toBe('c');
    expect(map.get('does not exist')).toBeNull();
});

test('iterate over HashMap', () => {
    const map = new HashMap();

    const data = {};
    for (let i = 0; i < 1000; i++) {
        // build index -> value reference
        data['key' + i] = 'value' + i;
        // load up HashMap with values
        map.put('key' + i, 'value' + i);
    }

    for (const e of map) {
        expect(e.key in data).toBeTruthy();
        expect(e.value).toBe(data[e.key]);
    }
});
