import React, { Component } from 'react'
import PhoneForm from './components/PhoneForm'
import PhoneInfo from './components/PhoneInfo';
import PhoneInfoList from './components/PhoneInfoList'

export default class App extends Component {

  //id 값은 렌더링되는 값이 아니기때문에 굳이 state에 넣어주지 않아도 된다
  id = 0;

  state = {
    information: [],
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
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        <PhoneInfoList data={this.state.information}/>
      </div>
    )
  }
}

