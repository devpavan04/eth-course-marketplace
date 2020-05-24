import React, { Component } from 'react';
import './App.css';

class Buy extends Component {

  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div className=''>
        <div className='d-flex flex-wrap'>
          {this.props.resources.map((resource, key) => {
            return (
              <div className='product-details shadow-lg'>
                <h5>product name</h5>
                <h6>{resource.name}</h6>
                <h5>product price</h5>
                <h6>{window.web3.utils.fromWei(resource.price.toString(), 'Ether')} Eth</h6>
                <h5>product owner</h5>
                <h6>{resource.owner}</h6>
                {
                  !resource.purchased && resource.owner != this.props.account
                    ?
                    <button name={resource.id} value={resource.price} className='btn btn-dark btn-block'
                      onClick={(event) => { this.props.buyResource(event.target.name, event.target.value) }}>
                      Buy</button>
                    :
                    resource.purchased && resource.owner != this.props.account
                      ?
                      <b><i>Sold out !</i></b>
                      :
                      resource.purchased && resource.owner == this.props.account
                        ?
                        <b>Purchased &#10004;</b>
                        :
                        resource.owner == this.props.account && !resource.purchased
                          ?
                          <b><i>Added	&#128077;</i></b>
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