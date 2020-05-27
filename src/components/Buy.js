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
      <div className='main-buy-style'>
        <div className='buy-heading'>
          <h1 className='ml-5 mt-2 display-3'>Course Catalogue :</h1>
        </div>
        <div className='d-flex flex-wrap'>
          {this.props.resources.map((resource, key) => {
            return (
              <div className='course-details'>
                <h5><b><i>Course name :</i></b></h5>
                <h5>{resource.name}</h5>
                <hr></hr>
                <h5><b><i>Course price :</i></b></h5>
                <h5>{window.web3.utils.fromWei(resource.price.toString(), 'Ether')} Eth</h5>
                <hr></hr>
                <h5><b><i></i>Course owner :</b></h5>
                <p>{resource.owner}</p>
                <hr></hr>
                {
                  !resource.purchased && resource.owner != this.props.account
                    ?
                    <button name={resource.id} value={resource.price} className='btn btn-block btn-primary btn-style'
                      onClick={(event) => { this.props.buyResource(event.target.name, event.target.value) }}>
                      Buy</button>
                    :
                    resource.purchased && resource.owner != this.props.account
                      ?
                      <button name={resource.id} value={resource.price} className='btn btn-block btn-danger btn-style'>Sold out !</button>
                      :
                      resource.purchased && resource.owner == this.props.account
                        ?
                        <button name={resource.id} value={resource.price} className='btn btn-block btn-success btn-style'>Purchased</button>
                        :
                        !resource.purchased && resource.owner == this.props.account
                          ?
                          <button name={resource.id} value={resource.price} className='btn btn-block btn-info btn-style'>Not sold...</button>
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