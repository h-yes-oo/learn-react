import React, { Component } from 'react'

export default class PhoneForm extends Component {
    input = React.createRef();

    state = {
        name: '',
        phone:'',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        //기본으로 수행되는 새로고침을 방지함
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: ''
        });
        this.input.current.focus();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    name="name"
                    placeholder="이름"
                    onChange={this.handleChange} 
                    value={this.state.name} 
                    ref={this.input}
                />
                <input 
                    name="phone"
                    placeholder="전화번호"
                    onChange={this.handleChange}
                    value={this.state.phone}
                />
                <button type="submit">등록</button>
            </form>
        );
    }
}