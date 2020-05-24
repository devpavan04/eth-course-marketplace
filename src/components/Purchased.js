import React, { Component } from 'react';
import './App.css';

class Purchased extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className=''>
        <div>
          {this.props.resources.map((resource, key) => {
            return (
              <div>
                {
                  resource.purchased && resource.owner === this.props.account
                    ?
                    <div className=''>
                      <i>{`https://ipfs.infura.io/ipfs/${resource.resourceIPFSHash}`}</i>
                      <br></br>
                      <b>{resource.name}</b>
                    </div>
                    :
                    null
                }
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Purchased;