import React, { Component } from 'react';

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
      <div id="content">

        <h1 className='m-3'>Upload your resouces link to the IPFS</h1>

        <form>
          <div className="form-group mr-sm-2">
            <input
              id="resourceName"
              type="text"
              ref={(input) => { this.resourceName = input }}
              className="form-control m-3"
              placeholder="Resource Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="resourcePrice"
              type="text"
              ref={(input) => { this.resourcePrice = input }}
              className="form-control m-3"
              placeholder="Resource Price"
              required />
          </div>
        </form>
        <input type='file' onChange={this.captureFile} className='m-3' />
        <button type="submit" className="btn btn-primary btn-block m-3" onClick={this.formSubmit}>Upload Resource Details</button>

        <h2>Buy Resource</h2>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sl no.</th>
              <th scope="col">Resource Name</th>
              <th scope="col">Resource Link Price</th>
              <th scope="col">Owner</th>
              <th scope="col" width='1000px'>Buy Link</th>
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
                        <button name={resource.id} value={resource.price} className='btn btn-primary btn-block'
                          onClick={(event) => { this.props.buyResource(event.target.name, event.target.value) }}>
                          Buy</button>
                        :
                        <h4>Download the resource link at <i>{`https://ipfs.infura.io/ipfs/${resource.resourceIPFSHash}`}</i></h4>
                    }
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Main;