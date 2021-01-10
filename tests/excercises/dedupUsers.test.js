/**
 * Write a function to deduplicate the following Users array by id field.
 * `id` field is unique across all users.
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

    expect(dedupUsersById(userList)).toEqual(
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
    expect(dedupUsersById(userList)).toEqual([]);
});


const { HashMap } = require('../../src/ds/hashMap');

function dedupUsersById(userList) {
    const userMap = new HashMap();
    userList.forEach(user => {
        userMap.put(user.id, user);
    });
    return Array.from(userMap).map((kv) => kv.value);
}