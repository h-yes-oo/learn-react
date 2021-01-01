import React, { useState, useReducer, useEffect } from 'react';
// import axios from 'axios';
// import useAsync from './useAsync'
import { useUsersState, useUsersDispatch, getUsers } from './UserContext';
import User from './User'

// function reducer(state, action) {
//     switch (action.type) {
//         case 'LOADING':
//             return {
//                 loading: true,
//                 data: null,
//                 error: null
//             };
//         case 'SUCCESS':
//             return {
//                 loading: false,
//                 data: action.data,
//                 error: null
//             };
//         case 'ERROR':
//             return {
//                 loading: false,
//                 data: null,
//                 error: action.error
//             };
//         default:
//             throw new Error(`Unhandled action type: ${action.type}`);
//     }
// }

// async function getUsers() {
//     const response = await axios.get(
//         'https://jsonplaceholder.typicode.com/users'
//     );
//     return response.data;
// }

function Users() {
    // const [state, dispatch] = useReducer(reducer,{
    //     loading: false,
    //     data: null,
    //     error: null
    // });
    // const fetchUsers = async() => {
    //     dispatch({type: 'LOADING'})
    //     try {
    //         const response = await axios.get(
    //             'https://jsonplaceholder.typicode.com/users'
    //         );
    //         dispatch({type:'SUCCESS', data: response.data})
    //     } catch(e) {
    //         dispatch({type:'ERROR', error: e})
    //     }
    // };

    // useEffect(()=> {
    //     fetchUsers();
    // }, []);

    // const [userId, setUserId] = useState(null);
    // const [state, refetch] = useAsync(getUsers,[], true);

    // const {loading, data: users, error} = state;

    // if(loading) return <div>로딩중...</div>
    // if(error) return <div>에러 발생</div>;
    // if(!users) return <button onClick={refetch}>불러오기</button>;

    const [userId, setUserId] = useState(null);
    const state = useUsersState();
    const dispatch = useUsersDispatch();

    const { data: users, loading, error } = state.users;
    const fetchData = () => {
        getUsers(dispatch);
    };

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>;
    if(!users) return <button onClick={fetchData}>불러오기</button>;

    return(
        <>
        <ul>
            {users.map(user => (
                <li 
                    key={user.id}
                    onClick={() => setUserId(user.id)}
                    style={{ cursor: 'pointer' }}
                >
                    {user.username} ({user.name})
                </li>
            ))}
        </ul>
        <button onClick={fetchData}>다시 불러오기</button>
        {userId && <User id={userId} />}
        </>
    );
}

export default Users;