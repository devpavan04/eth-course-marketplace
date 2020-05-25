import React, { Component } from 'react';
import '../Styles/Sell.css';
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
      <div className='container mt-4'>
        <div className='ml-0'>
          <h1>Upload the file containing course links to IPFS :</h1>
        </div>
        <div className='mt-3 sell-style'>
          <div>
            <form>
              <div className="form-group">
                <input
                  id="resourceName"
                  type="text"
                  ref={(input) => { this.resourceName = input }}
                  className="form-control text-black input-style"
                  placeholder="Course Name ex: Javascript"
                  required />
              </div>
              <div className="form-group">
                <input
                  id="resourcePrice"
                  type="text"
                  ref={(input) => { this.resourcePrice = input }}
                  className="form-control text-black input-style"
                  placeholder="Course Price ex: 2 ETH"
                  required />
              </div>
            </form>
          </div>
          <div className='mt-3'>
            <input type='file' onChange={this.captureFile} className='btn btn-light capture-style' />
          </div>
          <div>
            <button type="submit" className="btn btn-dark mt-4" onClick={this.formSubmit}>Upload Course Links</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sell;