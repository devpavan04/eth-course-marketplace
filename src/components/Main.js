import React, { Component } from 'react';
import './App.css';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      buffer: null
    }
  }

  formSubmit = (event) => {
    event.preventDefault()
    const name = this.resourceName.value
    const price = window.web3.utils.toWei(this.resourcePrice.value.toString(), 'Ether')
    const buffer = this.state.buffer
    this.props.addResourceDetails(name, price, buffer)
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  render() {
    return (
      <div id="content" className='design mt-0'>
        <div className='m-4'>
          <img src={`https://robohash.org/${this.props.account}?300x300`} className='float-right robo'></img>
          <div className='user'>
            <h2><b><i>Account Details :</i></b></h2>
            <h5>Address :  {this.props.account}</h5>
            <h5>Account Balance :  {this.props.accountBalance} ETH</h5>
          </div>
          <h3><i><b>Upload your resource links containg file to the IPFS here :</b></i></h3>
          <form>
            <div className="form-group mt-4">
              <input
                id="resourceName"
                type="text"
                ref={(input) => { this.resourceName = input }}
                className="form-control form-width"
                placeholder="Resource Name"
                required />
            </div>
            <div className="form-group">
              <input
                id="resourcePrice"
                type="text"
                ref={(input) => { this.resourcePrice = input }}
                className="form-control form-width"
                placeholder="Resource Price"
                required />
            </div>
          </form>
          <input type='file' onChange={this.captureFile} className='btn btn-light form-width' />
          <br />
          <button type="submit" className="btn btn-dark mt-4" onClick={this.formSubmit}>Upload Resource Details</button>
        </div>
        <div className='m-4'>
          <h3 className=''><i><b>Buy Products :</b></i></h3>
          <table className="table table-bordered mt-4 text-center text-white table-dark">
            <thead>
              <tr>
                <th scope="col"><i>Sl no.</i></th>
                <th scope="col"><i>Resource Name</i></th>
                <th scope="col"><i>Resource Link Price</i></th>
                <th scope="col"><i>Owner Address</i></th>
                <th scope="col"><i>File Download Link</i></th>
              </tr>
            </thead>
            <tbody id="resourceList">
              {this.props.resources.map((resource, key) => {
                return (
                  <tr key={key}>
                    <th scope="row">{resource.id.toString()}</th>
                    <td>{resource.name}</td>
                    <td>{window.web3.utils.fromWei(resource.price.toString(), 'Ether')} Eth</td>
                    <td>{resource.owner}</td>
                    <td>
                      {
                        !resource.purchased
                          ?
                          <button name={resource.id} value={resource.price} className='btn btn-dark btn-block'
                            onClick={(event) => { this.props.buyResource(event.target.name, event.target.value) }}>
                            Buy</button>
                          :
                          resource.owner === this.props.account
                            ?
                            <i>{`https://ipfs.infura.io/ipfs/${resource.resourceIPFSHash}`}</i>
                            :
                            resource.purchased && resource.owner != this.props.account
                              ?
                              <b><i>This item is sold out !</i></b>
                              :
                              null
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default Main;