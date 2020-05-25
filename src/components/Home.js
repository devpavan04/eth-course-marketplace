import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css';
class Home extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className='container home'>
        <div>
          <h2 className='display-1'>Decentralized Marketplace</h2>
        </div>
        <hr></hr>
        <div className='mt-5'>
          <h3>Account address :</h3>
          <h4>{this.props.account}</h4>
          <br></br>
          <h3>Account balance :</h3>
          <h4>{this.props.accountBalance} ETH</h4>
        </div>
        <hr></hr>
        <div className='mt-5'>
          <h3>Where do you want to go?</h3>
          <br></br>
          <div className='d-flex'>
            <div className='button-style btn-1'>
              <Link to='/'><a>Home</a></Link>
            </div>
            <div className='button-style btn-2'>
              <Link to='/sell'><a>Sell Course</a></Link>
            </div>
            <div className='button-style btn-3'>
              <Link to='/buy'><a>Buy Course</a></Link>
            </div>
            <div className='button-style btn-4'>
              <Link to='/purchased'><a>Purchased Items</a></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;