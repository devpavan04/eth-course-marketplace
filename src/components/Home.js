import React, { Component } from 'react';
import '../Styles/Home.css';
class Home extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div class="home-heading">
          <h1 className='display-2'>Decentralized Marketplace</h1>
        </div>
        <div className='sub-heading'>
          <h2>Sell or buy files and images decentrally.</h2>
        </div>
        <div className='account-details-home'>
          <h3><b><i>Account address :</i></b></h3>
          <h4>{this.props.account}</h4>
          <hr></hr>
          <h3><b><i>Account balance :</i></b></h3>
          <h4>{this.props.accountBalance} ETH</h4>
        </div>
      </div>
    );
  }
}

export default Home;