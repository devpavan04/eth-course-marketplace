import React, { Component } from 'react';
import './App.css';

class Sell extends Component {

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
    }
  }

  render() {
    return (
      <div className=''>
        <div>
          <h4>Upload your resource links containg file to the IPFS here :</h4>
        </div>
        <div>
          <form>
            <div className="form-group">
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
        </div>
        <div>
          <input type='file' onChange={this.captureFile} className='btn btn-light form-width' />
        </div>
        <div>
          <button type="submit" className="btn btn-dark mt-4" onClick={this.formSubmit}>Upload Resource Details</button>
        </div>
      </div>
    );
  }
}

export default Sell;