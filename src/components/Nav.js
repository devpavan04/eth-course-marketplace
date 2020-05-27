import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import '../Styles/Nav.css';
import { Link } from 'react-router-dom';

class Nav extends Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Navbar className='nav-styling'>
          <Link to='/'>
            <Navbar.Brand href="#home">Home</Navbar.Brand>
          </Link>
          <Link to='/sell'>
            <Navbar.Brand href="#home">Sell Course</Navbar.Brand>
          </Link>
          <Link to='/buy'>
            <Navbar.Brand href="#home">Buy Course</Navbar.Brand>
          </Link>
          <Link to='/purchased'>
            <Navbar.Brand href="#home">Purchased Items</Navbar.Brand>
          </Link>
        </Navbar>
      </div>
    );
  }
}

export default Nav;
