test('create empty Array', () => {
    const array = new Array();
    expect(array.length).toBe(0);
});

test('create Array with size 5, all undefined values', () => {
    const array = new Array(5);
    expect(array.length).toBe(5);
    expect(array).toEqual([undefined, undefined, undefined, undefined, undefined]);
});

test('push elements into Array', () => {
    const array = new Array();

    expect(array.push('a')).toBe(1);
    expect(array.push('b')).toBe(2);

    expect(Array.from(array)).toStrictEqual(['a', 'b']);
});

test('set elements into Array', () => {
    const array = new Array();

    array[0] = 'a';
    expect(array[0]).toBe('a');

    array[1] = 'b';
    expect(array[1]).toBe('b');

    array[10] = 'c';
    expect(array[10]).toBe('c');

    // assert inserting at index 10, left a gap of undefined data
    expect(array[9]).toBe(undefined);
});

test('pop elements from a array', () => {
    const array = new Array();

    // pop on empty Array
    expect(array.pop()).toBe(undefined);

    array.push('a');
    array.push('b');

    expect(array.pop()).toBe('b');
    expect(array.pop()).toBe('a');

    // verify all elements popped
    expect(array.pop()).toBe(undefined);
});

test('shift elements from a array', () => {
    const array = new Array();

    // shift on empty Array
    expect(array.shift()).toBe(undefined);

    array.push('a');
    array.push('b');

    expect(array.shift()).toBe('a');
    expect(array.shift()).toBe('b');

    // verify all elements have been shifted
    expect(array.shift()).toBe(undefined);
});

test('filter array elements', () => {
    const array = new Array();
    for (let i = 0; i < 10; i++) {
        array.push(i);
    }
    const result = array.filter((a) => a % 2 == 0);

    expect(result).toStrictEqual([0, 2, 4, 6, 8]);
});

test('slice an Array', () => {
    const array = new Array();

    array.push('a');
    array.push('b');
    array.push('c');
    array.push('d');

    expect(array.slice()).toEqual(['a', 'b', 'c', 'd']);
    expect(array.slice(0, 2)).toEqual(['a', 'b']);
    expect(array.slice(1, 3)).toEqual(['b', 'c']);
    expect(array.slice(2, 4)).toEqual(['c', 'd']);
    expect(array.slice(3, 5)).toEqual(['d']);
    expect(array.slice(100, 101)).toEqual([]);
});

test('remove elements from Array via splice', () => {
    const array = new Array();

    array.push('a');
    array.push('b');
    array.push('c');
    array.push('d');

    // verify splicing an index that does not exist returns empty 
    // and does not mutate array
    expect(array.splice(100, 1)).toStrictEqual([]);
    expect(array).toStrictEqual(['a', 'b', 'c', 'd']);

    // ['a', 'b', 'c', 'd']
    expect(array.splice(1, 2)).toStrictEqual(['b', 'c']);
    expect(array).toStrictEqual(['a', 'd']);

    // ['a', 'd']
    expect(array.splice(0, 1)).toStrictEqual(['a']);
    expect(array).toStrictEqual(['d']);

    // ['d']
    expect(array.splice(0, 1)).toStrictEqual(['d']);
    expect(array).toStrictEqual([]);

    // slice with empty values
    expect(array.splice(0, 1)).toStrictEqual([]);
    expect(array).toStrictEqual([]);
});


test('insert elements into array via splice', () => {
    const array = new Array();

    array.push('b');
    array.push('d');

    // ['b', 'd']
    expect(array.splice(1, 0, 'c')).toStrictEqual([]);
    expect(array).toStrictEqual(['b', 'c', 'd']);

    // ['a', 'b', 'd']
    expect(array.splice(0, 0, 'a')).toStrictEqual([]);
    expect(array).toStrictEqual(['a', 'b', 'c', 'd']);

    // ['a', 'b', 'c', 'd']
    expect(array.splice(4, 0, 'e')).toStrictEqual([]);
    expect(array).toStrictEqual(['a', 'b', 'c', 'd', 'e']);

    // assert slice insert at non-existing index inserts value 
    // at the end of the array.
    expect(array.splice(100, 1, 'f')).toStrictEqual([]);
    expect(array).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
});

test('iterate over Array', () => {
    const array = new Array();

    const data = {
        0: 'a',
        1: 'b',
        2: 'c',
    };

    array.push('a');
    array.push('b');
    array.push('c');

    let index = 0;

    for (const e of array) {
        expect(e).toBe(data[index]);
        index++;
    }
});

test('forEach over Array', () => {
    const array = new Array();

    const data = {
        0: 'a',
        1: 'b',
        2: 'c',
    };

    array.push('a');
    array.push('b');
    array.push('c');

    let index = 0;

    array.forEach(function (item, i, arr) {
        expect(array).toEqual(array);
        expect(i).toBe(index);
        expect(item).toBe(data[i]);
        index++;
    });
});

test('map over Array', () => {
    const array = new Array();

    array.push('a');
    array.push('b');
    array.push('c');

    expect(array).toEqual(['a', 'b', 'c']);
    expect(array.map(x => x.toUpperCase())).toEqual(['A', 'B', 'C']);
});