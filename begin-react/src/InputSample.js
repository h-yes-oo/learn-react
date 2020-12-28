import React, { useState, useRef } from 'react';

function InputSample() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })
    const nameInput = useRef();

    const { name, nickname } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const onReset = () => {
        setInputs({
            name:'',
            nickname:'',
        })
        nameInput.current.focus();
    }
    return(
        <div>
            <input name="name" placeholder="이름" value={name} onChange={onChange} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" value={nickname} onChange={onChange}/>
            <button onClick={onReset}>reset</button>
            <div>
                <b>value: </b>
                {name} ({nickname}) 
            </div>
        </div>
    );
}

export default InputSample;