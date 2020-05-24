import React, { Component } from 'react';
import './App.css';

class Home extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h3 className='display-2'>Hello,</h3>
        <h4>{this.props.account}</h4>
        <h4>Your account balance is :</h4>
        <h5>{this.props.accountBalance} ETH</h5>
      </div>
    );
  }
}

export default Home;