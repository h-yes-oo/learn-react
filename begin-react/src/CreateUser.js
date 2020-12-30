import React, { useContext, useEffect, useRef } from 'react';
import { UserDispatch } from './App'
import useInputs from './hooks/useInputs'

function CreateUser(){
    useEffect(()=>{
        console.log('Rendering Create User');
    })
    const dispatch = useContext(UserDispatch);
    const [{ username, email}, onChange, onReset] = useInputs({
        username:'',
        email:''
    });
    const nextId = useRef(4);

    return(
        <div>
            <input 
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={()=> {
                dispatch({
                    type: 'CREATE_USER',
                    user: {
                        id:nextId.current,
                        username,
                        email
                    }
                });
                onReset();
                nextId.current += 1;
            }}>register</button>
        </div>
    );
}

export default React.memo(CreateUser);