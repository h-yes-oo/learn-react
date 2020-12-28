import React, { useRef, useState } from 'react';
import Hello from './Hello';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: ''
  })
  const { username, email } = inputs;
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'hyesoo',
        email: 'hyesoo5115@naver.com',
        active: true
    },
    {
        id: 2,
        username: 'Flora',
        email: 'flora@kakao.com',
        active: false
    },
    {
      id: 3,
      username: 'Coco',
      email: 'coco@gmail.com',
      active: false
    }
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);
    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };

  const onRemove = id => {
    setUsers(users.filter(user => user.id !== id))
  };

  const onToggle = id => {
    setUsers(
      users.map(user => 
        user.id === id ? {...user, active: !user.active} : user
      )
    );
  };

  return (
    <>
      <CreateUser 
        username = {username}
        email = {email}
        onChange = {onChange}
        onCreate = {onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
}

export default App;
