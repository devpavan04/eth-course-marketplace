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
      <div className=''>
        <div className='sell-heading'>
          <h1 className='ml-5 mt-2 display-4'>Course Catalogue :</h1>
        </div>
        <div className='sell-styling'>
          <form>
            <h5><b><i>Course name :</i></b></h5>
            <div className="form-group">
              <input
                id="resourceName"
                type="text"
                ref={(input) => { this.resourceName = input }}
                className="form-control text-black input-style"
                placeholder="Course Name ex: Javascript"
                required />
            </div>
            <hr></hr>
            <h5><b><i>Course price :</i></b></h5>
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
          <hr></hr>
          <h5><b><i>Select file or image :</i></b></h5>
          <div className='mt-2'>
            <input type='file' onChange={this.captureFile} className='btn btn-light capture-style' />
          </div>
          <hr></hr>
          <div>
            <button type="submit" className="btn mt-2 btn-styling" onClick={this.formSubmit}>Upload to IPFS</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Sell;