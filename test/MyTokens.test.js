const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN; //BN- Big Number
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async accounts => {
  const [deployer, recipient, anotherAccount] = accounts;
  let instance;
  before(async() => {
    instance = await Token.deployed();
  })

  describe("Contract Testing", async() => {
    it("Sends all tokens to the deployer", async () => {
      const sendTokens = 1;
      
      let totalSupply = await instance.totalSupply();
      // old style without chai
      // let balance = await instance.balanceOf.call(initialHolder);
      // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
      
      // eventually- waits for promise to resolve
      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("can send tokens from Account 1 to Account 2", async () => {
      const sendTokens = 1;
      
      let totalSupply = await instance.totalSupply();

      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply);
      await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
      await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
  
    it("is not possible to send token greater than the balance of the account", async () => {
      let balanceOfAccount = await instance.balanceOf(deployer);
      await expect(instance.transfer(deployer, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

      // check if te balance is still the same
      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
  });

})


// using expect from chai