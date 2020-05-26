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
      <div className=''>
        <div className='purchased-heading'>
          <h1 className='ml-5 mt-2 display-4'>Your Courses :</h1>
        </div>
        <div className='purchased-styling'>
          {this.props.resources.map((resource, key) => {
            return (
              <div >
                {
                  resource.purchased && resource.owner === this.props.account
                    ?
                    <div className='your-course'>
                      <h5><b><i>Course Name :</i></b></h5>
                      <h5>{resource.name}</h5>
                      <hr></hr>
                      <h5><b><i>Course Download Link :</i></b></h5>
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