import React, { useEffect } from 'react';

function CreateUser({ username, email, onChange, onCreate }){
    useEffect(()=>{
        console.log('Rendering Create User');
    })
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
            value={email}/>
            <button onClick={onCreate}>register</button>
        </div>
    );
}

export default React.memo(CreateUser);