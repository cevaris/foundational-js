/**
 * Write a function to deduplicate the following Users array.
 * `id` field is guaranteed to be unique across all users. 
 */

const userList = [
    { id: 13, name: 'Jacob' },
    { id: 23, name: 'Alfred' },
    { id: 13, name: 'Jacob' },
    { id: 11, name: 'Nick' },
    { id: 110, name: 'Test' },
    { id: 132, name: 'Rick,' },
    { id: 11, name: 'Nick' },
]

// Expected result (ordering does not matter)
// [
//     { id: 13, name: 'Jacob' },
//     { id: 11, name: 'Nick' },
//     { id: 23, name: 'Alfred' },
//     { id: 110, name: 'Test' },
//     { id: 132, name: 'Rick,' }
// ]

function dedupUsers(userList) {
    const userMap = new Map();
    userList.forEach(user => {
        userMap.set(user.id, user)
    });
    return Array.from(userMap.values());
}

console.log(dedupUsers(userList));