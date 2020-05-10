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
      // SUCCESS
      assert.equal(resourceCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), resourceCount.toNumber())
      assert.equal(event.name, 'JavaScript')
      assert.equal(event.price, '1000000000000000000')
      assert.equal(event.owner, seller)
      assert.equal(event.purchased, false)
      assert.equal(event.resourceIPFSHash, ipfsHash)

      // FAILURE: Product must have a name
      await await marketplace.addResourceDetails('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Product must have a price
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
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') })

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), resourceCount.toNumber())
      assert.equal(event.name, 'JavaScript')
      assert.equal(event.price, '1000000000000000000')
      assert.equal(event.owner, buyer)
      assert.equal(event.purchased, true)
      assert.equal(event.resourceIPFSHash, ipfsHash)

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to buy a resource that does not exist, i.e., resource must have valid id
      await marketplace.buyResource(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy without enough ether
      await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // FAILURE: Deployer tries to buy the resource, i.e., resource can't be purchased twice
      await marketplace.buyResource(resourceCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await marketplace.buyResource(resourceCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })

})
