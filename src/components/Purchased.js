import React, { Component } from 'react';
import '../Styles/Purchased.css';

class Purchased extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className='ml-4 mt-4'>
        <div className=''>
          <h1>Your Courses :</h1>
        </div>
        <hr></hr>
        <div>
          {this.props.resources.map((resource, key) => {
            return (
              <div className=''>
                {
                  resource.purchased && resource.owner === this.props.account
                    ?
                    <div className='mt-4 your-course'>
                      <h4>Course Name :</h4>
                      <h5>{resource.name}</h5>
                      <br></br>
                      <h4>Course Download Link :</h4>
                      <h5>{`https://ipfs.infura.io/ipfs/${resource.resourceIPFSHash}`}</h5>
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