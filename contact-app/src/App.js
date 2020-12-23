import React, { Component } from 'react'
import PhoneForm from './components/PhoneForm'
import PhoneInfo from './components/PhoneInfo';
import PhoneInfoList from './components/PhoneInfoList'

export default class App extends Component {

  //id 값은 렌더링되는 값이 아니기때문에 굳이 state에 넣어주지 않아도 된다
  id = 0;

  state = {
    information: [ ],
    keyword: '',
  }

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleCreate = (data) => {
    //비구조 할당 문법을 사용하여 코드를 간소화, 가독성 높임
    const { information } = this.state;
    // 리액트의 불변성을 유지하기 위해 !!
    this.setState({
      //비어있는 객체에 data와 id를 넣어준다
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    });
  }

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id,data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => {
          if(info.id === id){
            return {
              id,
              ...data,
            };
          }
          return info;
        }
      )
    })
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <input
          value = {this.state.keyword}
          onChange = {this.handleChange}
          placeholder="searching.."
          />
        <PhoneInfoList data={this.state.information.filter(
          info => info.name.indexOf(this.state.keyword) > -1
        )} 
        onRemove={this.handleRemove} 
        onUpdate = {this.handleUpdate} 
        />
      </div>
    )
  }
}

