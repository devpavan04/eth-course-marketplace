import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <ul class="navbar-nav">
          <Link to='/'>
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
          </Link>
          <Link to='/sell'>
            <li class="nav-item">
              <a class="nav-link" href="#">Sell Course</a>
            </li>
          </Link>
          <Link to='/buy'>
            <li class="nav-item">
              <a class="nav-link" href="#">Buy Course</a>
            </li>
          </Link>
          <Link to='/purchased'>
            <li class="nav-item">
              <a class="nav-link" href="#">Purchased Items</a>
            </li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
