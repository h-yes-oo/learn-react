import React from 'react';

function User({ user }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    )
}

function UserList() {
    const users = [
        {
            id: 1,
            username: 'hyesoo',
            email: 'hyesoo5115@naver.com'
        },
        {
            id: 2,
            username: 'Flora',
            email: 'flora@kakao.com'
        }
    ];

    return (
        <div>
            {users.map(user => (
                <User user={user} key={user.id} />
            ))}
        </div>
    )
}

export default UserList;