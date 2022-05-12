const Token = artifacts.require("MyToken");
require("dotenv").config({ path: "../.env" });

var chai = require("./chaisetup");
const BN = web3.utils.BN; //BN- Big Number
const expect = chai.expect;

contract("Token Test", async accounts => {
  const [deployer, recipient, anotherAccount] = accounts;
  let instance;
  beforeEach(async() => {
    // instance = await Token.deployed(); //uses the data from deploying in migrations
    instance = await Token.new(process.env.INITIAL_TOKENS); //creates a new deployment
  })

  describe("Contract Testing", async() => {
    it("Sends all tokens to the deployer", async () => {
      const sendTokens = 1;
      
      let totalSupply = await instance.totalSupply();
      // old style without chai
      // let balance = await instance.balanceOf.call(initialHolder);
      // assert.equal(balance.valueOf(), initialSupply.valueOf(), "The balance was not the same");
      
      // eventually- waits for promise to resolve
      return expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("can send tokens from Account 1 to Account 2", async () => {
      const sendTokens = 1;
      
      let totalSupply = await instance.totalSupply();

      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply);
      await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
      await expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
      return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
  
    it("is not possible to send token greater than the balance of the account", async () => {
      let balanceOfAccount = await instance.balanceOf(deployer);
      await expect(instance.transfer(deployer, new BN(balanceOfAccount+1))).to.eventually.be.rejected;

      // check if te balance is still the same
      return expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
  });

})


// using expect from chai
// before() is run once before all the tests in a describe
// beforeEach() is run before each test in a describe