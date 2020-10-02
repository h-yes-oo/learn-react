import React, { Component } from 'react'
import PhoneForm from './components/PhoneForm'

export default class App extends Component {

  //id 값은 렌더링되는 값이 아니기때문에 굳이 state에 넣어주지 않아도 된다
  id = 0;

  state = {
    information: [],
  }

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))
    })
  }
  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        {JSON.stringify(this.state.information)}
      </div>
    )
  }
}

