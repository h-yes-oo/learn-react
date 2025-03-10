import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
// import Hello from './Hello';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
//import './App.css';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중..');
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: '',
  },
  users: [
    {
      id: 1,
      username: 'hyesoo',
      email: 'hyesoo5115@naver.com',
      active: true,
    },
    {
      id: 2,
      username: 'Flora',
      email: 'flora@kakao.com',
      active: false,
    },
    {
      id: 3,
      username: 'Coco',
      email: 'coco@gmail.com',
      active: false,
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        users: state.users.concat(action.user),
      };
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  // const [{ username, email}, onChange, onReset] = useInputs({
  //   username:'',
  //   email:''
  // });
  const [state, dispatch] = useReducer(reducer, initialState);
  // const nextId = useRef(4);

  const { users } = state;

  // const onCreate = useCallback( e => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email
  //     }
  //   });
  //   onReset();
  //   nextId.current += 1;
  // }, [username, email, onReset])

  // const onToggle = useCallback( id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   })
  // }, [])

  // const onRemove = useCallback( id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   });
  // }, [])

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성사용자 수 : {count} </div>
    </UserDispatch.Provider>
  );
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // })
  // const { username, email } = inputs;
  // const onChange = useCallback(
  //   e => {
  //     const { name, value } = e.target;
  //     setInputs(inputs => ({
  //       ...inputs,
  //       [name]: value
  //     }))
  //   },
  //   []
  // );
  // const [users, setUsers] = useState([
  //   {
  //       id: 1,
  //       username: 'hyesoo',
  //       email: 'hyesoo5115@naver.com',
  //       active: true
  //   },
  //   {
  //       id: 2,
  //       username: 'Flora',
  //       email: 'flora@kakao.com',
  //       active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'Coco',
  //     email: 'coco@gmail.com',
  //     active: false
  //   }
  // ]);

  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   setUsers(users => users.concat(user));
  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // },[username, email]);

  // const onRemove = useCallback(
  //   id => {
  //     setUsers(users => users.filter(user => user.id !== id))
  //   },
  //   []
  // );

  // const onToggle = useCallback(
  //   id => {
  //     setUsers(users =>
  //       users.map(user =>
  //         user.id === id ? {...user, active: !user.active} : user
  //       )
  //     );
  //   },
  //   []
  // );

  // const count = useMemo(() => countActiveUsers(users), [users]);

  // return (
  //   <>
  //     <CreateUser
  //       username = {username}
  //       email = {email}
  //       onChange = {onChange}
  //       onCreate = {onCreate}
  //     />
  //     <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
  //     <div>활성사용자 수 : {count}</div>
  //   </>
  // );
}

export default App;
