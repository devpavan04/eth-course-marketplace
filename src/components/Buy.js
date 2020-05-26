import React, { Component } from 'react';
import '../Styles/Buy.css'

class Buy extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className='ml-3 mt-3'>
          <h1>Course Catalogue :</h1>
        </div>
        <hr></hr>
        <div className='d-flex flex-wrap'>
          {this.props.resources.map((resource, key) => {
            return (
              <div className='Course-details shadow-lg'>
                <h4>Course name</h4>
                <h5>{resource.name}</h5>
                <br></br>
                <h4>Course price</h4>
                <h5>{window.web3.utils.fromWei(resource.price.toString(), 'Ether')} Eth</h5>
                <br></br>
                <h4>Course owner</h4>
                <h6>{resource.owner}</h6>
                <br></br>
                {
                  !resource.purchased && resource.owner != this.props.account
                    ?
                    <button name={resource.id} value={resource.price} className='btn btn-block btn-style'
                      onClick={(event) => { this.props.buyResource(event.target.name, event.target.value) }}>
                      Buy</button>
                    :
                    resource.purchased && resource.owner != this.props.account
                      ?
                      <h5><b><i>Sold out !</i></b></h5>
                      :
                      resource.purchased && resource.owner == this.props.account
                        ?
                        <h5><b><i>Purchased &nbsp;	&#10004;</i></b></h5>
                        :
                        resource.owner == this.props.account && !resource.purchased
                          ?
                          <h5><b><i>Added to catalogue	&#128077;</i></b></h5>
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

export default Buy;