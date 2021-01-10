/**
 * Write a function to deduplicate the following Users array by id field.
 * `id` field is unique across all users.
 * 
 * Note, dont use your custom HashMap; use regular ES6 `new Map()`.
 */


test('dedup user list that contain duplicates', () => {
    const userList = [
        { id: 13, name: 'Jacob' },
        { id: 23, name: 'Alfred' },
        { id: 13, name: 'Jacob' },
        { id: 11, name: 'Nick', gender: 'male' },
        { id: 110, name: 'Test', dob: '2000-12-12' },
        { id: 132, name: 'Rick', occupation: 'Teacher' },
        { id: 11, name: 'Nick', gender: 'male' },
    ];

    expect(dedupUsers(userList)).toEqual(
        expect.arrayContaining([
            { id: 13, name: 'Jacob' },
            { id: 11, name: 'Nick', gender: 'male' },
            { id: 23, name: 'Alfred' },
            { id: 110, name: 'Test', dob: '2000-12-12' },
            { id: 132, name: 'Rick', occupation: 'Teacher' },
        ])
    );
});

test('handles empty user list', () => {
    const userList = [];
    expect(dedupUsers(userList)).toEqual([]);
});

function dedupUsers(userList) {
    const userMap = new Map();
    userList.forEach(user => {
        userMap.set(user.id, user)
    });
    return Array.from(userMap.values());
}