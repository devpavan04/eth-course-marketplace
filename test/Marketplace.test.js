const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace', ([deployer, seller, buyer]) => {
  let marketplace

  before(async () => {
    marketplace = await Marketplace.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await marketplace.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
  })

  describe('resources', async () => {
    let result, resourceCount, ipfsHash

    before(async () => {
      ipfsHash = 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
      result = await marketplace.addResourceDetails('JavaScript', web3.utils.toWei('1', 'Ether'), ipfsHash, { from: seller })
      resourceCount = await marketplace.resourceCount()
    })

    it('uploads resources details and fetches ipfs hash of the resource', async () => {
      assert.equal(resourceCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), resourceCount.toNumber())
      assert.equal(event.name, 'JavaScript')
      assert.equal(event.price, '1000000000000000000')
      assert.equal(event.owner, seller)
      assert.equal(event.purchased, false)
      assert.equal(event.resourceIPFSHash, ipfsHash)

      await await marketplace.addResourceDetails('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      await await marketplace.addResourceDetails('JavaScript', 0, { from: seller }).should.be.rejected;
    })

    it('lists resources', async () => {
      const resource = await marketplace.resources(resourceCount)
      assert.equal(resource.id.toNumber(), resourceCount.toNumber())
      assert.equal(resource.name, 'JavaScript')
      assert.equal(resource.price, '1000000000000000000')
      assert.equal(resource.owner, seller)
      assert.equal(resource.purchased, false)
      assert.equal(resource.resourceIPFSHash, ipfsHash)
    })

    it('sells resources', async () => {
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      result = await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') })

      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), resourceCount.toNumber())
      assert.equal(event.name, 'JavaScript')
      assert.equal(event.price, '1000000000000000000')
      assert.equal(event.owner, buyer)
      assert.equal(event.purchased, true)
      assert.equal(event.resourceIPFSHash, ipfsHash)

      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      await marketplace.buyResource(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      await marketplace.buyResource(resourceCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })

})
