import React, { createContext, useReducer, useContext } from 'react';
import { createAsyncDispatcher, createAsyncHandler, initialAsyncState} from './asyncActionUtils';
import * as api from './api';
//import axios from 'axios';

const initialState = {
    users: initialAsyncState,
    user: initialAsyncState
}

const usersHandler = createAsyncHandler('GET_USERS','users');
const userHandler = createAsyncHandler('GET_USER','user');

function usersReducer(state, action) {
    switch (action.type) {
        case 'GET_USERS':
        case 'GET_USERS_SUCCESS':
        case 'GET_USERS_ERROR':
            return usersHandler(state, action);
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export function UsersProvider({ children }) {
    const [state, dispatch] = useReducer(usersReducer, initialState);
    return (
        <UsersStateContext.Provider value={state}>
            <UsersDispatchContext.Provider value={dispatch}>
                {children}
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    )
}

export function useUsersState() {
    const state = useContext(UsersStateContext);
    if(!state) {
        throw new Error('Cannot find UsersProvider');
    }
    return state;
}

export function useUsersDispatch() {
    const dispatch = useContext(UsersDispatchContext);
    if(!dispatch) {
        throw new Error('Cannot find UsersProvider');
    }
    return dispatch;
}

// export async function getUsers(dispatch) {
//     dispatch({ type: 'GET_USERS' });
//     try {
//         const response = await axios.get(
//             'https://jsonplaceholder.typicode.com/users'
//         );
//         dispatch({ type: 'GET_USERS_SUCCESS', data: response.data });
//     } catch (e) {
//         dispatch({ type: 'GET_USERS_ERROR', error: e });
//     }
// }

// export async function getUser(dispatch, id){
//     dispatch({ type: 'GET_USER' });
//     try {
//         const response = await axios.get(
//             `https://jsonplaceholder.typicode.com/users/${id}`
//         );
//         dispatch({ type: 'GET_USER_SUCCESS', data: response.data });
//     } catch(e) {
//         dispatch({ type: 'GET_USER_ERROR', error: e });
//     }
// }

export const getUsers = createAsyncDispatcher('GET_USERS', api.getUsers);
export const getUser = createAsyncDispatcher('GET_USER', api.getUser);