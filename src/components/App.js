import React, { Component } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Marketplace from '../abis/Marketplace.json';
import Nav from './Nav';
import Home from './Home';
import Sell from './Sell';
import Buy from './Buy';
import Purchased from './Purchased';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      accountBalance: 0,
      resourceCount: 0,
      resources: [],
      loading: true,
      resourceIPFSHash: null,
      buffer: null
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    let accountBalance = await web3.eth.getBalance(accounts[0]);
    console.log(accountBalance)
    accountBalance = web3.utils.fromWei(accountBalance, 'ether')
    console.log(accountBalance)
    this.setState({ accountBalance })

    const networkId = await web3.eth.net.getId()

    const networkData = Marketplace.networks[networkId]

    if (networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
      this.setState({ marketplace })

      const resourceCount = await marketplace.methods.resourceCount().call()
      this.setState({ resourceCount })

      // Load resources
      for (var i = 1; i <= resourceCount; i++) {
        const product = await marketplace.methods.resources(i).call()
        this.setState({
          resources: [...this.state.resources, product]
        })
      }
      this.setState({ loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }

  addResourceDetails = (name, price, buffer) => {
    this.setState({ loading: true })
    this.setState({ buffer: buffer })
    ipfs.add(buffer, (error, result) => {
      console.log('Ipfs result', result)
      if (error) {
        console.error(error)
        return
      }
      this.setState({ resourceIPFSHash: result[0].hash })
      this.state.marketplace.methods.addResourceDetails(name, price, result[0].hash).send({ from: this.state.account })
    })
  }

  buyResource = (id, price) => {
    this.setState({ loading: true })
    this.state.marketplace.methods.buyResource(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div className=''>
        {
          this.state.loading
            ?
            <div id="loader" className="text-center"><p className="text-center"><h1 className='display-display-4 mt-5'><i>Loading...</i></h1></p></div>
            :
            <div>
              <Router>
                <Nav />
                <Switch>
                  <Route path='/' exact render={() =>
                    <Home
                      account={this.state.account}
                      accountBalance={this.state.accountBalance} />}
                  />

                  <Route path='/sell' render={() =>
                    <Sell
                      resources={this.state.resources}
                      addResourceDetails={this.addResourceDetails}
                      buyResource={this.buyResource}
                      account={this.state.account}
                      accountBalance={this.state.accountBalance} />}
                  />

                  <Route path='/buy' render={() =>
                    <Buy
                      resources={this.state.resources}
                      addResourceDetails={this.addResourceDetails}
                      buyResource={this.buyResource}
                      account={this.state.account}
                      accountBalance={this.state.accountBalance} />}
                  />

                  <Route path='/purchased' render={() =>
                    <Purchased
                      resources={this.state.resources}
                      account={this.state.account}
                      accountBalance={this.state.accountBalance} />}
                  />
                </Switch>

              </Router>
            </div>
        }
      </div>
    );
  }
}

export default App;
